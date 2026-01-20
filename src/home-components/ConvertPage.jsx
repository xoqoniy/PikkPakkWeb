// src/ConvertPage.jsx
import React, { useState } from 'react';
import api from '../api/axios';

const ConvertPage = ({ user, onBack }) => {
  const [amountStr, setAmountStr] = useState('0');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const digits = ['1','2','3','4','5','6','7','8','9','0'];

  const handleDigit = (d) => {
    setMessage('');
    setAmountStr((prev) => {
      if (prev === '0') return d;
      if (prev.length >= 9) return prev;
      return prev + d;
    });
  };

  const handleBackspace = () => {
    setMessage('');
    setAmountStr((prev) => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const numericAmount = Number(amountStr);

  const handleSubmit = async () => {
    if (!numericAmount || isNaN(numericAmount)) {
      setMessage('Please enter a valid amount.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const res = await api.post('/api/Bank/withdraw', {
        amount: numericAmount, // 🔧 adjust DTO
      });
      console.log('withdraw response:', res.data);
      setMessage('Conversion successful ✅');
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          'Conversion failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page topup-page">
      <div className="topup-header">
        <button className="topup-back" onClick={onBack}>
          ←
        </button>
        <div className="topup-title-area">
          <div className="topup-title">Convert Tokens</div>
          <div className="topup-amount-main">{amountStr} PT</div>
          <div className="topup-amount-sub">{amountStr} HUF</div>
        </div>
      </div>

      <div className="topup-keypad">
        {digits.slice(0, 9).map((d) => (
          <button
            key={d}
            type="button"
            className="pin-key"
            onClick={() => handleDigit(d)}
          >
            {d}
          </button>
        ))}
        <div className="pin-key pin-key-empty" />
        <button
          type="button"
          className="pin-key"
          onClick={() => handleDigit('0')}
        >
          0
        </button>
        <button
          type="button"
          className="pin-key pin-key-back"
          onClick={handleBackspace}
        >
          ⌫
        </button>
      </div>

      <button
        type="button"
        className="btn-primary topup-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Processing…' : 'Convert'}
      </button>

      {message && <div className="home-action-message">{message}</div>}

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

export default ConvertPage;
