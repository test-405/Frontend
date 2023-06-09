import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { IconButton, Typography, Card, CardBody, CardFooter } from "@material-tailwind/react";
import { DocumentIcon } from '@heroicons/react/24/outline'

import { QUERY_LIBRARY_URL, QUERY_PAPER_URL } from './config';
import { useTabs, TabTypeEnum } from './TabsContext';
import { DocTab } from './components/DocTab';

import Cookies from 'js-cookie';

const TABLE_HEAD = ["Paper_id", "Title", "Authors", "publisher", "Year", "Source", "Action"];

export const PaperPage = ({library_id}) => {
    console.log('PaperPage library_id', library_id);
    const token = Cookies.get('authToken');
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        axios.get(QUERY_PAPER_URL, {
            params: {
                library_id: library_id,
                page_num: 1,
                page_size: 10,
            },
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
        }, )
            .then(response => {
                response = response.data;
                console.log(response.data.papers)
                setPapers([...response.data.papers, {
                    paper_id: 0,
                    title: "test_title",
                    authors: "test_authors",
                    publisher: "test_publisher",
                    year: 2023,
                    source: "647989fe11171a8078ec0461",
                }]);
                console.log('papers', papers)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const { tabs, addTab, setActiveTab } = useTabs();

    const handleTabClick = (paper) => {
        console.log("get paper " + paper.paper_id)
        const tabId = 'paper:' + paper.paper_id;
        if(tabs.find(tab => tab.id === tabId)) {
            console.log('tab already exists');
            console.log('try to change to tab ' + tabId);
            setActiveTab(tabId);
            return;
        }

        const newTab = {
            value: paper.title,
            icon: DocumentIcon,
            tabType:  TabTypeEnum.Paper,
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
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {paper.paper_id}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
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
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {paper.source}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                                                    modify
                                                </Typography>
                                                <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                                                    delete
                                                </Typography>
                                                <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                                                    Comments
                                                </Typography>
                                            </td>
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
        </div >
    );
};
