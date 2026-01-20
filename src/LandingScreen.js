import React from 'react';
import './LandingScreen.css';

const LandingScreen = ({ onLogin, onRegister }) => {
  return (
    <div className="landing-container">
      {/* --- Header (Language) --- */}
      <header className="landing-header">
        <div className="language-selector">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" 
            alt="English" 
            className="flag-icon" 
          />
          <span className="dropdown-arrow">▼</span>
        </div>
      </header>

      {/* --- Logo Section --- */}
      <section className="logo-section">
        <div className="brand-logo">
                <h1 className="brand-name">PikkPakk</h1>
                </div>
        <p className="powered-by">powered by <strong>OTPBank</strong></p>
      </section>

      {/* --- User Card (Hanna/Guest) --- */}
      <main className="user-card-container">
        <div className="user-card">
          <div className="avatar-placeholder">
            <span className="user-icon">👤</span>
          </div>
          <h2 className="user-name">Guest User</h2>
        </div>
      </main>

      {/* --- Buttons --- */}
      <nav className="action-buttons">
        <button className="btn btn-primary" onClick={onLogin}>Login</button>
        <button className="btn btn-secondary" onClick={onRegister}>Register</button>
      </nav>

      {/* --- Footer Tips --- */}
      <footer className="landing-footer">
        <div className="tip-box">
          <span className="tip-icon">💡</span>
          <p className="tip-text">
            Review transactions regularly and report anything unusual immediately.
          </p>
        </div>
        
        <div className="bottom-nav">
          <div className="nav-item">
            <span>💬</span>
            <p>Need help?</p>
          </div>
          <div className="nav-item">
            <span>≡</span>
            <p>More</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;