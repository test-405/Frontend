import { useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { TextField, Input} from '@mui/material';
import { Popover, PopoverContent, PopoverHandler, Typography, IconButton, Button } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

import Cookies from 'js-cookie';

import { ADD_PAPER_URL } from "../config";

function AddPaper({library_id, onRefresh}, ref) {
    const [title, setTitle] = useState(null)
    const [authors, setAuthors] = useState(null)
    const [publisher, setPublisher] = useState(null)
    const [year, setYear] = useState(null)
    const [popoverOpen, setPopoverOpen] = useState(false);

    const resetState = () => {
        console.log("in reset")
        setPopoverOpen(false);
        setTitle(null);
        setAuthors(null);
        setPublisher(null);
        setYear(null);
    };

    useImperativeHandle(ref, () => ({
        resetState
    }));

    const handlePopover = () => {
        setPopoverOpen(!popoverOpen);
    };

    const handleAddPaper = async () => {
        try {
            const token = Cookies.get('authToken');

            const response = await axios.post(ADD_PAPER_URL, {
                library_id: library_id,
                title: title,
                authors: authors,
                publisher: publisher,
                year: year,
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 && response.data['code'] === 0) {
                console.log('添加paper成功');
                console.log(response);
                onRefresh();
            } else {
                console.log('添加paper失败');
                console.log(response);
            }
        } catch (error) {
            console.log("添加paper失败");
        }
    };

    return (
        <div className="fixed bottom-20 right-20">
            <Popover placement="top" open={popoverOpen} handler={handlePopover}>
                <PopoverHandler>
                    <IconButton size="lg" className="rounded-full">
                        <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                    </IconButton>
                </PopoverHandler>
                <PopoverContent className="w-96">
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-6"
                    >
                        添加文献
                    </Typography>
                    <form>
                        <div className="flex flex-col gap-6">
                            <TextField size="small" label="Title" value={title} required onChange={(e) => { setTitle(e.target.value) }}></TextField>
                            <TextField size="small" label="Authors" value={authors} optional onChange={(e) => { setAuthors(e.target.value) }}></TextField>
                            <TextField size="small" label="Publisher" value={publisher} optional onChange={(e) => { setPublisher(e.target.value) }}></TextField>
                            <TextField size="small" label="Year" value={year} optional onChange={(e) => { setYear(e.target.value) }}></TextField>
                            <Button className="w-1/2 self-center" variant="gradient" disabled={(!title)} onClick={handleAddPaper}>
                                添加
                            </Button>
                        </div>
                    </form>
                </PopoverContent>
            </Popover >
        </div>
    );
}

export default forwardRef(AddPaper)