// src/ReceivePage.jsx
import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const ReceivePage = ({ user, onBack }) => {
  const email = user?.email || user?.Email || 'unknown@example.com';
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error(e);
      alert('Could not copy to clipboard');
    }
  };

  return (
    <div className="page receive-page">
      <div className="receive-header">
        <button className="topup-back" onClick={onBack}>
          ←
        </button>
        <div className="topup-title-area">
          <div className="topup-title">Receive Tokens</div>
          <div className="receive-subtitle">
            Align the QR code within the frame to scan
          </div>
        </div>
      </div>

      {/* QR box */}
      <div className="receive-qr-box">
        <div className="receive-qr-inner">
          {/* QR encodes the user's e-mail */}
          <QRCode value={email} size={180} />
        </div>
      </div>

      <div className="receive-or">Or copy address</div>

      <div className="receive-address-row">
        <div className="receive-address-pill">
          {email}
        </div>
        <button
          type="button"
          className="receive-copy-btn"
          onClick={copyEmail}
        >
          📋
        </button>
      </div>

      {copied && (
        <div className="home-action-message">Copied!</div>
      )}

      <nav className="home-bottom-nav">
        <div className="home-bottom-item">
          <span>🏠</span>
          <span>Home</span>
        </div>
        <div className="home-bottom-item home-bottom-item-active">
          <span>💳</span>
          <span>Payment</span>
        </div>
        <div className="home-bottom-item">
          <span>📄</span>
          <span>Transactions</span>
        </div>
        <div className="home-bottom-item">
          <span>⚙️</span>
          <span>Settings</span>
        </div>
      </nav>
    </div>
  );
};

export default ReceivePage;
