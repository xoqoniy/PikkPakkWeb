// src/home-components/SendFromQrPage.jsx
import React, { useState } from 'react';
import api from '../api/axios';
import TxLoadingOverlay from './TxLoadingOverlay';

const SendFromQrPage = ({ email, onBack, onTxSuccess, onTxFailure }) => {
  const [amountStr, setAmountStr] = useState('0');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

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
      const payload = {
        recipientEmail: email,       // 🔥 from QR
        amount: numericAmount,
      };
      console.log('send-email (QR) payload:', payload);

      const res = await api.post('/api/Transfer/send-email', payload);
      const data = res.data;
      console.log('send-email (QR) response:', data);

      const txInfo = {
        direction: 'outgoing',
        recipientEmail: email,
        toName: data.toName ?? data.recipientName ?? email,
        amount: numericAmount,
        status: data.status ?? 'Completed',
        polygonUrl:
          data.polygonUrl ??
          data.explorerLink ??
          data.explorerUrl ??
          data.polygonscanUrl ??
          data.txUrl ??
          '',
        accountId: data.accountId ?? '',
        createdAt: data.timestamp ?? data.createdAt ?? new Date().toISOString(),
      };

      onTxSuccess?.(txInfo);
    } catch (err) {
      console.error('send-email (QR) error:', err);
      console.log('error response data (QR):', err.response?.data);

      const raw = err.response?.data;
      let reason;

      if (typeof raw === 'string') {
        reason = raw;
      } else if (raw?.message) {
        reason = raw.message;
      } else if (raw?.Error) {
        reason = raw.Error;
      } else if (raw?.errors) {
        reason = JSON.stringify(raw.errors);
      } else {
        reason = err.message || 'Transfer failed';
      }

      setMessage(reason);

      const txInfo = {
        direction: 'outgoing',
        recipientEmail: email,
        amount: numericAmount,
        status: 'Failed',
        error: reason,
        createdAt: new Date().toISOString(),
      };

      onTxFailure?.(txInfo);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page topup-page">
      {loading && <TxLoadingOverlay />}

      <div className="topup-header">
        <button className="topup-back" onClick={onBack}>
          ←
        </button>
        <div className="topup-title-area">
          <div className="topup-title">Send Tokens</div>
          <div className="topup-amount-main">{amountStr} PT</div>
          <div className="topup-amount-sub">{amountStr} HUF</div>
          <div className="topup-account-pill">
            To: {email}
          </div>
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
        {loading ? 'Sending…' : 'Send'}
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

export default SendFromQrPage;
