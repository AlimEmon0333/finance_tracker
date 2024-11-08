import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./splashcss.css";

const SplashLoading = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      navigate('/dashboard');  // Navigate to the dashboard after the splash screen
    }, 5000); // Set the timeout to 5000 ms (5 seconds)

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigate]);

  if (!showSplash) return null; // Hide splash screen after timeout

  return (
    <div className='flex h-[100vh] justify-center items-center'>
      <div className="loader">
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__ball"></div>
      </div>
    </div>
  );
};

export default SplashLoading;
