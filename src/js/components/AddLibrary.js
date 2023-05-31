import { Popover, PopoverContent, PopoverHandler, Typography, Button, IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import { TextField, Switch } from "@mui/material";
import { PlusIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import { ADD_LIBRARY_URL } from '../config';

import Cookies from 'js-cookie';


export default function AddLibrary() {

    const [topic, setTopic] = useState(null)
    const [desc, setDesc] = useState(null)
    const [is_public, setPubluc] = useState(false)

    const handleSwitchState = (e) => {
        console.log(e.target.checked)
        setPubluc(e.target.checked)
    };

    const handleAddLibrary = async () => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.post(ADD_LIBRARY_URL, {
                topic: topic,
                desc: desc,
                is_public: is_public
            },{
                withCredentials: true, // 发送请求时带上cookie
                // 可选：如果需要传递其他请求头或参数，请在这里添加
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            console.log('添加文献库成功');
            console.log(response);
        } catch (error) {
            console.log("添加文献库失败");
        }
    }

    // console.log(InputStylesType)
    return (
        <Popover placement="top">
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
                    添加文献库
                </Typography>
                <form>
                    <div className="flex flex-col gap-6">
                        <TextField size="small" label="主题" required onChange={(e) => { setTopic(e.target.value) }}></TextField>
                        <TextField size="small" label="描述" required onChange={(e) => { setDesc(e.target.value) }}></TextField>
                        <Switch label={
                            <div>
                                <Typography color="blue-gray" className="font-medium">公开文献库</Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    任何人都可以查看和下载文献库中的文献
                                </Typography>
                            </div>}
                            containerProps={{
                                className: "-mt-5"
                            }}
                            checked={is_public}
                            onChange={handleSwitchState} />
                        <Button className="w-1/2 self-center" variant="gradient" disabled={(!topic || !desc)} onClick={handleAddLibrary}>添加</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover >
    );
}