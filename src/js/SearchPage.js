import React, { useState } from "react";
import {
    BookOpenIcon,
    BuildingLibraryIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import axios from 'axios';
import { SEARCH_LIBRARY_URL, SEARCH_PAPER_URL } from './config';
import FailAlert from "./components/FailAlert";

export default function SearchPage({ onSearch }) {
    const [activeTab, setActiveTab] = useState("library");

    // new
    const [topic, setTopic] = useState('');
    const [library_id, setLibraryId] = useState('');
    const [title, setTitle] = useState('');

    // const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const handleSearchLibrary = async () => {
        try {
            const response = await axios.get(SEARCH_LIBRARY_URL, {
                params: {
                    page_num: 1,
                    page_size: 10,
                    topic: topic,
                }
            })
                .then(response => {
                    response = response.data;
                    console.log(response)
                    console.log('data', response.data)
                    // setLibraries(response.data);
                    // console.log('libraries', libraries)
                })
                .catch(error => {
                    console.log('what the fuck')
                    setShowAlert(true)
                    setAlertMsg('查询失败') //FIXME 关掉弹窗不会再次触发
                    console.error(error);
                });
            console.log('search library');
            console.log(topic);
            // onSearch();
        } catch (error) {
            setShowAlert(true);
            setAlertMsg('查询失败')
            // onSearch();
        }
    };

    const handleSearchPaper = async () => {
        try {
            console.log(library_id);
            const response = await axios.get(SEARCH_PAPER_URL, {
                params: {
                    library_id: library_id,
                    page_num: 1,
                    page_size: 10,
                    //title: 'test',
                }
            })
                .then(response => {
                    response = response.data;
                    console.log(response)
                    console.log('data', response.data)
                    // setLibraries(response.data);
                    // console.log('libraries', libraries)
                })
                .catch(error => {
                    console.log('what the fuck')
                    setShowAlert(true)
                    setAlertMsg('查询失败') //FIXME 关掉弹窗不会再次触发
                    console.error(error);
                });
            console.log('search paper');
            console.log(library_id);
            console.log(title);
            // onSearch();
        } catch (error) {
            console.log('what the fuck')
            setShowAlert(true);
            setAlertMsg('查询失败')
            // onSearch();
        }
    };

    return (
        // <div className="flex items-center justify-center h-screen">
        <div class="flex  justify-center h-screen">
            <div className="w-2/5 max-w-[24rem]">
                <div class="bg-blue-500/10 border border-blue-gray-500/20 rounded-full w-full flex flex-row items-center gap-2 p-2">
                    <div class="flex">
                        {/* button */}
                        <button class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/30 rounded-full" type="button"
                            onClick={() => setActiveTab("library")}
                        >
                            <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                <BuildingLibraryIcon className="h-5 w-5" />
                            </span>
                        </button>
                        {/* <button class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/30 rounded-full" type="button"
                            onClick={() => setActiveTab("paper")}
                        >
                            <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                <BookOpenIcon className="h-5 w-5" />
                            </span>
                        </button> */}
                    </div>

                    {/* message */}
                    <div class="relative w-full min-w-[200px] grid h-full">
                        <textarea rows="1" placeholder="Topic" class="peer w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500 min-h-full focus:border-transparent !border-0"
                            onChange={
                                (e) => {
                                    setTopic(e.target.value)
                                    // setIsFormValid(e.target.value !== '' && topic !== '')
                                }}
                        >
                        </textarea>
                        <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 before:content-none after:content-none">
                        </label>
                    </div>

                    {/* button */}
                    <div>
                        <button class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/30 rounded-full" type="button"
                            onClick={handleSearchLibrary}
                        >
                            <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                <MagnifyingGlassIcon className="h-5 w-5" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
