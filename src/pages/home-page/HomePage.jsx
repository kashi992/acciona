import React, { useState, useEffect, useRef } from 'react'
import HeroSlider from './heroSlider'
import LoginForm from '../login-page/index'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  // const hasLogged = useRef(false);  // ✅ Ref to prevent double logging

  // useEffect(() => {
  //   if (hasLogged.current) return; // 🛑 Already logged once
  //   hasLogged.current = true;      // ✅ Mark as logged

  //   // Fetch IP information from ipinfo.io
  //   fetch("https://ipinfo.io/json?token=0451d8a1ae05e5")
  //     .then(res => res.json())
  //     .then(data => {
  //       fetch("https://ayiq5xvjya.execute-api.us-east-1.amazonaws.com/default/trackVisitor", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(data)
  //       });
  //     });

  // }, []);

  return (
    <>
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (

        <HeroSlider />
      )}
    </>
  )
}

export default HomePage