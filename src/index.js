// index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginPage from './js/LoginPage';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-tailwind/react";
import Cookies from 'js-cookie';
import { BrowserRouter as Router, useRoutes, useNavigate } from 'react-router-dom';

function RootComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('isLoggedIn') === 'true');
  const navigate = useNavigate();

  // 重新检查登录状态
  const handleCheckLogin = () => {
    console.log('Cookies.get(authToken)', Cookies.get('authToken'))
    if (Cookies.get('authToken') === 'undefined') {
      setIsLoggedIn(false)
      Cookies.set('isLoggedIn', 'false');
    }
    else {
      setIsLoggedIn(Cookies.get('isLoggedIn') === 'true');
    }
  };

  useEffect(() => {
    handleCheckLogin();
    if (isLoggedIn && window.location.pathname === '/login') {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const routing = useRoutes([
    { path: 'login', element: <LoginPage onLogin={handleCheckLogin} /> },
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
