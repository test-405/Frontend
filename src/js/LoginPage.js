import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { LOGIN_URL, REGISTER_URL } from './config';
import FailAlert from "./components/FailAlert";

export default function LoginPage({ onLogin }) {
    const [activeTab, setActiveTab] = useState("login");
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    // const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(LOGIN_URL, {
                username: loginUsername,
                password: loginPassword,
            });

            Cookies.set('isLoggedIn', 'true');

            const { token } = response.data

            Cookies.set('authToken', token)

            console.log('登录成功');

            onLogin();
        } catch (error) {
            // setError('登录失败，请检查你的用户名和密码');
            setShowAlert(true);
            setAlertMsg('登录失败，请检查你的用户名和密码')
            onLogin();

        }
    }

    const handleRegister = async () => {
        if (registerPassword !== confirmPassword) {
            setShowAlert(true)
            setAlertMsg('两次输入密码不一致')
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL, {
                username: registerUsername,
                password: registerPassword,
            });

            Cookies.set('isLoggedIn', 'true');

            const { token } = response.data;

            Cookies.set('authToken', token);

            console.log('注册成功');

            onLogin();
        } catch (error) {
            // setError('注册失败，请重试');
            setShowAlert(true);
            setAlertMsg('注册失败，请重试');
            onLogin();
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
        <Card className="w-1/5 max-w-[24rem]">
            <CardHeader
                color="blue"
                floated={false}
                shadow={false}
                className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
            >
                {/* <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
          <BanknotesIcon className="h-10 w-10" />
        </div> */}
                <Typography variant="h4" color="white">

                </Typography>
            </CardHeader>
            <CardBody>
                <Tabs value={activeTab} className="overflow-visible">
                    <TabsHeader className="relative z-0 ">
                        <Tab value="login" onClick={() => setActiveTab("login")}>
                            登录
                        </Tab>
                        <Tab value="register" onClick={() => setActiveTab("register")}>
                            注册
                        </Tab>
                    </TabsHeader>
                    <TabsBody
                        className="!overflow-x-hidden !overflow-y-visible"
                        animate={{
                            initial: {
                                x: activeTab === "login" ? 400 : -400,
                            },
                            mount: {
                                x: 0,
                            },
                            unmount: {
                                x: activeTab === "login" ? 400 : -400,
                            },
                        }}
                    >
                        <TabPanel value="login" className="p-0">
                            {/* <Typography color="gray" className="mt-1 font-normal">输入登录信息</Typography> */}
                            <form className="mt-12 flex flex-col gap-4">
                                <div className="mb-4 flex flex-col gap-6">
                                    <Input size="lg" color="blue" outline={true} placeholder="UserName" value={loginUsername} onChange={
                                        (e) => {
                                            setLoginUsername(e.target.value);
                                            setIsFormValid(e.target.value !== '' && loginUsername !== '')
                                        }} />
                                    <Input type="password" size="lg" placeholder="Password" value={loginPassword} onChange={
                                        (e) => {
                                            setLoginPassword(e.target.value)
                                            setIsFormValid(e.target.value !== '' && loginPassword !== '')
                                        }} />
                                </div>
                                <div className="flex items-center justify-center">
                                    <Button
                                        color="blue"
                                        buttonType="filled"
                                        block={false}
                                        ripple="light"
                                        size="lg" onClick={handleLogin}>
                                        提交
                                    </Button>
                                </div>
                            </form>
                        </TabPanel>
                        <TabPanel value="register" className="p-4">
                            <form className="mt-12 flex flex-col gap-4">
                                <div className="mb-4 flex flex-col gap-6">
                                    <Input size="lg" placeholder="UserName" value={registerUsername} onChange={
                                        (e) => {
                                            setRegisterUsername(e.target.value)
                                            setIsFormValid(e.target.value !== '' && registerUsername !== '')
                                        }} />
                                    <Input type="password" size="lg" placeholder="Password" value={registerPassword} onChange={
                                        (e) => {
                                            setRegisterPassword(e.target.value)
                                            setIsFormValid(e.target.value !== '' && registerPassword !== '')
                                        }} />
                                    <Input type="password" size="lg" placeholder="Confirm Password" value={confirmPassword} onChange={
                                        (e) => {
                                            setConfirmPassword(e.target.value)
                                            setIsFormValid(e.target.value !== '' && confirmPassword !== '' && registerPassword === confirmPassword)
                                        }} />
                                </div>
                                <div className="flex items-center justify-center">
                                    <Button
                                        color="blue"
                                        buttonType="filled"
                                        block={false}
                                        ripple="light"
                                        size="lg" onClick={handleRegister}>
                                        提交
                                    </Button>
                                </div>
                            </form>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
                {showAlert && (
                    <FailAlert showAlert={showAlert} alertMsg={alertMsg} />
                )}
            </CardBody>
        </Card>
        </div>
    );
}
