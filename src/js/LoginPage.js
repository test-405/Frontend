import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { LOGIN_URL, REGISTER_URL } from './config';
import FailAlert from "./components/FailAlert";
import { TextField } from "@mui/material";


export default function LoginPage({ onLogin }) {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSignin, setIsSignin] = useState(true);
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

            const token = response.data.data['access_token'];

            Cookies.set('authToken', token)

            console.log('登录成功');

            onLogin();
        } catch (error) {
            console.log("登录失败");
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
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">{
                        isSignin ? 'Sign In' : 'Sign Up'
                    }
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    {isSignin ?
                        <form className="mt-12 flex flex-col gap-4">
                            <TextField label="请输入用户名" size="small" value={loginUsername} onChange={(e) => {
                                setLoginUsername(e.target.value)
                                setIsFormValid(e.target.value && loginPassword)
                            }
                            }></TextField>

                            <TextField label="请输入密码" size="small"  type="password"  helperText="
                            " value={loginPassword} onChange={(e) => { setLoginPassword(e.target.value); setIsFormValid(e.target.value && loginUsername) }}></TextField>
                            <Button
                                variant="gradient"
                                fullWidth
                                onClick={handleLogin}
                                disabled={!isFormValid}
                            >
                                登录
                            </Button>
                        </form> :
                        <form className="mt-12 flex flex-col gap-4">
                            <TextField label="请输入用户名" size="small" value={registerUsername} onChange={(e) => {
                                setIsFormValid(e.target.value && registerPassword && confirmPassword)
                                setRegisterUsername(e.target.value)
                            }}></TextField>
                            <TextField label="请输入密码" size="small" type="password" value={registerPassword} onChange={(e) => {
                                setIsFormValid(e.target.value && registerUsername && confirmPassword)
                                setRegisterPassword(e.target.value)
                            }}></TextField>
                            <TextField label="确认密码" size="small" helperText="请确保两次密码输入一致" type="password" value={confirmPassword} onChange={(e) => {
                                setIsFormValid(e.target.value && registerUsername && registerPassword && e.target.value === registerPassword)
                                setConfirmPassword(e.target.value)
                            }}></TextField>
                            <Button
                                variant="gradient"
                                fullWidth
                                onClick={handleRegister}
                                disabled={!isFormValid}
                            >
                                注册
                            </Button>
                        </form>
                    }
                    {
                        isSignin ?
                            <Typography variant="small" className="mt-6 flex justify-center">
                                没有账号？
                                <Typography
                                    as="button"
                                    variant="small"
                                    color="blue"
                                    className="ml-1 font-bold"
                                    onClick={() => {
                                        setIsSignin(false);
                                    }}
                                >
                                    注册
                                </Typography>
                            </Typography> :

                            <Typography variant="small" className="mt-6 flex justify-center">
                                已有账号？
                                <Typography
                                    as="button"
                                    variant="small"
                                    color="blue"
                                    className="ml-1 font-bold"
                                    onClick={() => {
                                        setIsSignin(true);
                                    }}
                                >
                                    登录
                                </Typography>
                            </Typography>
                    }
                    <FailAlert showAlert={showAlert} alertMsg={alertMsg} setShowAlert={setShowAlert}/ >
                </CardBody>
            </Card>
        </div>
    );
}