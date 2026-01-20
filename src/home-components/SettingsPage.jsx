// src/home-components/SettingsPage.jsx
import React from 'react';

const SettingsPage = ({ user, onBack, onLogout }) => {
  const name = user?.name || user?.Name || 'Guest';
  const email = user?.email || user?.Email || '';

  return (
    <div className="page home-page">
      <div className="send-header">
        <button className="topup-back" onClick={onBack}>
          ←
        </button>
        <div className="send-title-area">
          <div className="topup-title">Settings</div>
        </div>
      </div>

      <div className="home-section">
        <div className="home-reminder-card" style={{ marginTop: 8 }}>
          <div className="home-reminder-icon">👤</div>
          <div>
            <div className="home-reminder-title">Profile</div>
            <div className="home-reminder-text">
              {name}
              {email ? ` · ${email}` : ''}
            </div>
          </div>
        </div>

        <div className="home-section" style={{ marginTop: 16 }}>
          <button
            type="button"
            className="btn-primary home-action-btn"
            onClick={() => alert('Profile editing coming soon')}
          >
            Profile
          </button>

          <button
            type="button"
            className="btn-secondary home-action-btn"
            style={{ marginTop: 12 }}
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <nav className="home-bottom-nav">
        <div
          className="home-bottom-item"
          onClick={onBack}
        >
          <span>🏠</span>
          <span>Home</span>
        </div>
        <div className="home-bottom-item">
          <span>📄</span>
          <span>Transactions</span>
        </div>
        <div className="home-bottom-item">
          <span>💳</span>
          <span>Payment</span>
        </div>
        <div className="home-bottom-item home-bottom-item-active">
          <span>⚙️</span>
          <span>Settings</span>
        </div>
      </nav>
    </div>
  );
};

export default SettingsPage;
