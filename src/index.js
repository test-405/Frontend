import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginPage from './js/LoginPage';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-tailwind/react";
import Cookies from 'js-cookie';

function RootComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('isLoggedIn') === 'true');

  // 重新检查登录状态
  const handleCheckLogin = () => {
    setIsLoggedIn(Cookies.get('isLoggedIn') === 'true');
    console.log(Cookies.get('isLoggedIn'))
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  if (isLoggedIn) {
    return <App />;
  } else {
    return <LoginPage onLogin={handleCheckLogin} />;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RootComponent />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
