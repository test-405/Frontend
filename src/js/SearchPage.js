import React, { useState } from "react";
import {
    BuildingLibraryIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import axios from 'axios';
import { QUERY_LIBRARY_URL } from './config';
import { IconButton } from "@material-tailwind/react";
import FailAlert from "./components/FailAlert";
import { Paper, InputBase, Divider } from '@mui/material';

import myImage from "../image/icon.jpg";

export function SearchPage() {

    // new
    const [topic, setTopic] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);

    const handleSearchLibrary = async () => {
        try {
            const response = await axios.get(QUERY_LIBRARY_URL, {
                params: {
                    page_num: 1,
                    page_size: 10,
                    topic: topic,
                }
            })
                .then(response => {
                    response = response.data;
                    console.log(response)
                    console.log('data', response.data.libraries)
                    if (response.data.libraries.length === 0) {
                        setAlertMsg('未找到相关文献库')
                        setShowAlert(true)
                    }
                    // setLibraries(response.data);
                    // console.log('libraries', libraries)
                })
                .catch(error => {
                    console.log('what the fuck')
                    setShowAlert(true)
                    setAlertMsg('查询失败')
                    console.error(error);
                });
            console.log('search library');
            console.log(topic);
            // onSearch();
        } catch (error) {
            setShowAlert(true);
            setAlertMsg('查询失败')
        }
    };

    return (
        <div>
            {showAlert ? <div className="absolute top-0 w-11/12"><FailAlert showAlert={showAlert} setShowAlert={setShowAlert} alertMsg={alertMsg} /></div> : null}
            <div className="flex items-center justify-center min-h-screen">
                <div className="absolute w-1/2 top-20">
                    <div className="flex flex-col items-center"> 
                        <img
                            className="h-1/3 w-1/3 rounded-lg mb-5"
                            src={myImage}
                            alt="请我吃麦当劳.jpg"
                        />
                    </div>
                    <Paper
                        className="margin-top-10"
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: 50 }}
                    >
                        <IconButton variant="text" disabled>
                            <BuildingLibraryIcon className="h-8 w-8" />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 5, flex: 1 }}
                            placeholder="搜索文献库"
                            onChange={(e) => {
                                setTopic(e.target.value)
                            }}
    
                        />
                        <IconButton className="rounded-full" variant="text" onClick={handleSearchLibrary}>
                            <MagnifyingGlassIcon className="h-8 w-8" />
                        </IconButton>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    </Paper>
                </div>
            </div>
        </div>
    )
    
};