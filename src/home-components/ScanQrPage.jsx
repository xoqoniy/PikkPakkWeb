// src/ScanQrPage.jsx
import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import ArrowIcon from '../assets/images/arrow_forward.svg'; 
const ScanQrPage = ({ onBack, onScannedEmail }) => {
  const [localError, setLocalError] = useState('');

  const handleScan = (detectedCodes) => {
    const first = detectedCodes?.[0];
    if (!first?.rawValue) return;

    const email = String(first.rawValue).trim();
    if (!email.includes('@')) {
      setLocalError('Scanned code is not a valid e-mail.');
      return;
    }

    onScannedEmail(email); // App will go to SendFromQrPage
  };

  return (
    <div className="page pin-page">
      <div className="pin-header">
  {/* new back button */}
        <button className="scan-back-btn" onClick={onBack}>
          <img
            src={ArrowIcon}
            alt="Back"
            className="scan-back-icon"
          />
        </button>
        <h2>Scan QR</h2>
        <p className="pin-subtitle">
          Point the camera at the QR code to get the recipient e-mail.
        </p>
      </div>

      <div className="home-qr-card" style={{ width: '90%', maxWidth: 360 }}>
        <Scanner
          onScan={handleScan}
          onError={(err) => {
            console.error(err);
            setLocalError('Could not access camera.');
          }}
          style={{ width: '100%' }}
        />
      </div>

      {localError && (
        <div className="home-action-message">{localError}</div>
      )}

      <nav className="home-bottom-nav">
        <div className="home-bottom-item home-bottom-item-active">
          <span>💳</span>
          <span>Payment</span>
        </div>
        <div className="home-bottom-item">
          <span>🏠</span>
          <span>Home</span>
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

export default ScanQrPage;
