// src/components/BottomNav.jsx
import React from 'react';

import homeIcon from '../assets/images/home.svg';
import paymentIcon from '../assets/images/Payment.svg';
import txIcon from '../assets/images/transactions-icon.svg';
import settingsIcon from '../assets/images/settings-icon.svg';

const BottomNav = ({
  active = 'home',          // 'home' | 'payment' | 'transactions' | 'settings'
  onHome,
  onPayment,
  onTransactions,
  onSettings,
}) => {
  return (
    <nav className="home-bottom-nav">
      <button
        type="button"
        className={
          'home-bottom-item ' +
          (active === 'home' ? 'home-bottom-item-active' : '')
        }
        onClick={onHome}
      >
        <div className="home-bottom-icon">
          <img src={homeIcon} alt="Home" />
        </div>
        <span className="home-bottom-label">Home</span>
      </button>

      <button
        type="button"
        className={
          'home-bottom-item ' +
          (active === 'payment' ? 'home-bottom-item-active' : '')
        }
        onClick={onPayment}
      >
        <div className="home-bottom-icon">
          <img src={paymentIcon} alt="Payment" />
        </div>
        <span className="home-bottom-label">Payment</span>
      </button>

      <button
        type="button"
        className={
          'home-bottom-item ' +
          (active === 'transactions' ? 'home-bottom-item-active' : '')
        }
        onClick={onTransactions}
      >
        <div className="home-bottom-icon">
          <img src={txIcon} alt="Transactions" />
        </div>
        <span className="home-bottom-label">Transactions</span>
      </button>

      <button
        type="button"
        className={
          'home-bottom-item ' +
          (active === 'settings' ? 'home-bottom-item-active' : '')
        }
        onClick={onSettings}
      >
        <div className="home-bottom-icon">
          <img src={settingsIcon} alt="Settings" />
        </div>
        <span className="home-bottom-label">Settings</span>
      </button>
    </nav>
  );
};

export default BottomNav;
