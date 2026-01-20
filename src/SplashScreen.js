import React, { useEffect } from 'react';
import './SplashScreen.css';
import icon from './assets/icon.svg'; 

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    // Set a 3-second timer to finish the splash screen
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [onFinish]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <img src={icon} alt="PikkPakk Logo" className="splash-logo" />
      </div>
      <div className="splash-footer">
        <p>powered by Wakeel</p>
        <p>for <strong>OTPBank</strong></p>
      </div>
    </div>
  );
};

export default SplashScreen;