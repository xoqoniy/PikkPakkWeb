// src/home-components/TxLoadingOverlay.jsx
import React from 'react';
// adjust the path if your folder structure is different
import PikkPakkLogo from '../assets/images/PikkPakk-icon.svg';

const TxLoadingOverlay = () => {
  return (
    <div className="tx-loading-overlay">
      <div className="tx-loading-content">
        <div className="tx-loading-logo">
          <img
            src={PikkPakkLogo}
            alt="PikkPakk"
            className="tx-loading-logo-img"
          />
        </div>
        <div className="tx-loading-text">Processing transaction…</div>
      </div>
    </div>
  );
};

export default TxLoadingOverlay;
