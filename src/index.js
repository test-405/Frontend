// index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginPage from './js/LoginPage';
import LibraryPage from './js/LibraryPage'; // 新增的文献库管理页面
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-tailwind/react";
import Cookies from 'js-cookie';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

function RootComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('isLoggedIn') === 'true');

  // 重新检查登录状态
  const handleCheckLogin = () => {
    setIsLoggedIn(Cookies.get('isLoggedIn') === 'true');
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  const routing = useRoutes([
    { path: 'login', element: isLoggedIn ? <App /> : <LoginPage onLogin={handleCheckLogin} /> },
    { path: '/', element: isLoggedIn ? <App /> : <LoginPage onLogin={handleCheckLogin} /> },
  ]);

  return routing;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <RootComponent />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
