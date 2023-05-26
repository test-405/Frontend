import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Card, Input, Button } from '@material-tailwind/react';
import { LOGIN_URL } from './config';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(LOGIN_URL, {
        username,
        password,
      });

      Cookies.set('isLoggedIn', 'true');

      console.log('登录成功');

      onLogin();
    } catch (error) {
      setError('登录失败，请检查你的用户名和密码');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 p-6">
        <h1 className="text-2xl font-bold mb-4">登录</h1>
        <Input
          type="text"
          color="blue"
          size="regular"
          outline={true}
          placeholder="用户名"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          type="password"
          color="blue"
          size="regular"
          outline={true}
          placeholder="密码"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          color="blue"
          buttonType="filled"
          size="regular"
          block={false}
          ripple="light"
          onClick={handleLogin}
        >
          登录
        </Button>
        {error && <div className="text-red-500">{error}</div>}
      </Card>
    </div>
  );
}

export default LoginPage;
