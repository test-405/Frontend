import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { IconButton, Typography, Card, CardBody, CardFooter } from "@material-tailwind/react";
import { QUERY_LIBRARY_URL, QUERY_PAPER_URL } from './config';

const TABLE_HEAD = ["Paper_id", "Title", "Authors", "publisher", "Year", "Source", "Action"];

export const PaperPage = ({library_id}) => {
    console.log('PaperPage library_id', library_id);
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        axios.get(QUERY_PAPER_URL, {
            params: {
                library_id: library_id,
                page_num: 1,
                page_size: 10,
            }
        })
            .then(response => {
                response = response.data;
                console.log(response.data.papers)
                setPapers([...response.data.papers, {
                    paper_id: 1,
                    title: "test_title",
                    authors: "test_authors",
                    publisher: "test_publisher",
                    year: 2023,
                    source: "test_source",
                }]);
                console.log('papers', papers)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

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
                                    {papers.map(({ paper_id, title, authors, publisher, year, source }, index) => (
                                        <tr key={paper_id} className="even:bg-blue-gray-50/50">
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {paper_id}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {title}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {authors}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {publisher}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {year}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {source}
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
