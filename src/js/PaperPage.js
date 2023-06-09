import React, { useState, useEffect, Fragment, useRef } from 'react';
import axios from 'axios';
import { IconButton, Typography, Card, Button } from "@material-tailwind/react";
import { DocumentIcon } from '@heroicons/react/24/outline'

import { TextField } from '@mui/material';

import { MODIFY_PAPER_URL, QUERY_LIBRARY_URL, QUERY_PAPER_URL, DELETE_PAPER_URL } from './config';
import { useTabs, TabTypeEnum } from './TabsContext';
import { DocTab } from './components/DocTab';
import AddPaper from './components/AddPaper';

import Cookies from 'js-cookie';

let TABLE_HEAD = ["Title", "Authors", "Publisher", "Year", "Action"];

export const PaperPage = ({ library_id }) => {
    console.log('PaperPage library_id', library_id);
    const token = Cookies.get('authToken');
    const [papers, setPapers] = useState([]);

    const [refresh, setRefresh] = useState(false);
    const [isYours, setIsYours] = useState(true);
    const [editPaper, setEditPaper] = useState(null);

    const fetchPapers = async () => {
        axios.get(QUERY_PAPER_URL, {
            params: {
                library_id: library_id,
                page_num: 2,
                page_size: 10,
            },
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        },)
            .then(response => {
                response = response.data;
                console.log(response.data.papers)
                // setIsYours(response.data.is_yours);
                console.log('isYours', isYours)
                if (!isYours) {
                    TABLE_HEAD = ["Title", "Authors", "Publisher", "Year"];
                }
                setPapers([...response.data.papers]);
                console.log('papers', papers)
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchPapers();
    }, []);

    //  for add refresh
    const addPaperRef = useRef();

    useEffect(() => {
        if (refresh) {
            fetchPapers();
            addPaperRef.current.resetState();
            setRefresh(false);
        }
    }, [refresh]);

    const handleComponentRefresh = () => {
        setRefresh(true);
    };
    // end for add refresh 

    const { tabs, addTab, setActiveTab } = useTabs();

    const handleTabClick = (paper) => {
        console.log("get paper " + paper.paper_id)
        const tabId = 'paper:' + paper.paper_id;
        if (tabs.find(tab => tab.id === tabId)) {
            console.log('tab already exists');
            console.log('try to change to tab ' + tabId);
            setActiveTab(tabId);
            return;
        }

        const newTab = {
            value: paper.title,
            icon: DocumentIcon,
            tabType: TabTypeEnum.Paper,
            id: tabId,
            tabBody: <DocTab paper_id={paper.paper_id} />
        };

        addTab(newTab);
        setActiveTab(newTab.id);
    }

    return (
        <div className="flex flex-col">
            {papers.length > 0 ? (
                <Fragment className="left-0 right-10">
                    <Card className="overflow-scroll h-full w-full">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {papers.map(paper => (
                                    <tr key={paper.paper_id} className="even:bg-blue-gray-50/50" onClick={() => handleTabClick(paper)}>
                                        {
                                            editPaper && editPaper.paper_id === paper.paper_id ?
                                                <>
                                                    <td className="p-4">
                                                        <TextField size='small' variant='outlined' type='standard' defaultValue={editPaper.title} onChange={
                                                            (e) => {
                                                                setEditPaper({
                                                                    ...editPaper,
                                                                    title: e.target.value,
                                                                })
                                                            }
                                                        } />
                                                    </td>
                                                    <td className="p-4">
                                                        <TextField size='small' variant='outlined' type='standard' defaultValue={editPaper.authors} onChange={
                                                            (e) => {
                                                                setEditPaper({
                                                                    ...editPaper,
                                                                    authors: e.target.value,
                                                                })
                                                            }
                                                        } />
                                                    </td>
                                                    <td className="p-4">
                                                        <TextField size='small' variant='outlined' type='standard' defaultValue={editPaper.publisher} onChange={
                                                            (e) => {
                                                                setEditPaper({
                                                                    ...editPaper,
                                                                    publisher: e.target.value,
                                                                })
                                                            }
                                                        } />
                                                    </td>
                                                    <td className="p-4">
                                                        <TextField size='small' variant='outlined' type='standard' defaultValue={editPaper.year} onChange={
                                                            (e) => {
                                                                setEditPaper({
                                                                    ...editPaper,
                                                                    year: e.target.value,
                                                                })
                                                            }
                                                        } />
                                                    </td></> :
                                                <><td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {paper.title}
                                                    </Typography>
                                                </td>
                                                    <td className="p-4">
                                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                                            {paper.authors}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-4">
                                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                                            {paper.publisher}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-4">
                                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                                            {paper.year}
                                                        </Typography>
                                                    </td>
                                                </>
                                        }
                                        {
                                            isYours && (
                                                editPaper && editPaper.paper_id === paper.paper_id ?
                                                    <td className="p-4">
                                                        <Typography variant="small" className="font-medium" color="blue" as="a"
                                                            href="javascript:void(0)" onClick={() => {
                                                                setEditPaper(null);
                                                            }}>cancel</Typography>
                                                        <Typography variant="small" className="font-medium" color="blue" as="a"
                                                            href="javascript:void(0)" onClick={async () => {
                                                                let modifiedItems = {};
                                                                if (editPaper.title !== paper.title) {
                                                                    modifiedItems.title = editPaper.title;
                                                                }
                                                                if (editPaper.authors !== paper.authors) {
                                                                    modifiedItems.authors = editPaper.authors;
                                                                }
                                                                if (editPaper.publisher !== paper.publisher) {
                                                                    modifiedItems.publisher = editPaper.publisher;
                                                                }
                                                                if (editPaper.year !== paper.year) {
                                                                    modifiedItems.year = editPaper.year;
                                                                }
                                                                try {
                                                                    const response = await axios.put(MODIFY_PAPER_URL + `/${editPaper.paper_id}`, modifiedItems, {
                                                                        withCredentials: true,
                                                                        headers: {
                                                                            Authorization: `Bearer ${token}`
                                                                        }
                                                                    })
                                                                        .then(response => {
                                                                            console.log('modify paper');
                                                                            console.log(response);
                                                                            setPapers(papers.map(paper => {
                                                                                if (paper.paper_id === editPaper.paper_id) {
                                                                                    return {
                                                                                        ...paper,
                                                                                        ...modifiedItems,
                                                                                    }
                                                                                }
                                                                                return paper;
                                                                            }));
                                                                            setEditPaper(null);
                                                                        })
                                                                        .catch(error => {
                                                                            console.log('what the fuck')
                                                                            console.error(error);
                                                                        });
                                                                    console.log('search library');
                                                                    // onSearch();
                                                                } catch (error) {
                                                                }
                                                            }
                                                            }>confirm</Typography>
                                                    </td>
                                                    :
                                                    <>
                                                        <td className="p-4">
                                                            <Typography variant="small" className="font-medium" color="blue" as="a"
                                                                href="javascript:void(0)" onClick={() => {
                                                                    setEditPaper(paper);
                                                                }}>modify</Typography>
                                                            <Typography variant="small" className="font-medium" color="blue" as="a"
                                                                href="javascript:void(0)" onClick={() => {
                                                                    axios.delete(DELETE_PAPER_URL + `/${paper.paper_id}`, {
                                                                        withCredentials: true,
                                                                        headers: {
                                                                            Authorization: `Bearer ${token}`
                                                                        }
                                                                    })
                                                                        .then(response => {
                                                                            console.log('delete paper');
                                                                            console.log(response);
                                                                            setPapers(papers.filter(temp => temp.paper_id !== paper.paper_id));
                                                                            setEditPaper(null);
                                                                        })
                                                                        .catch(error => {
                                                                            console.log('what the fuck')
                                                                            console.error(error);
                                                                        });
                                                                }}>delete</Typography>
                                                        </td>
                                                    </>
                                            )
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </Fragment>)
                : (
                    <div className="flex center">
                        <Typography variant="h6" color="gray">暂无文献</Typography>
                    </div>
                )}
            < AddPaper className="right-0" ref={addPaperRef} library_id={library_id} onRefresh={handleComponentRefresh} />
        </div >
    );
};