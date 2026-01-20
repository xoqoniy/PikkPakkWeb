// src/home-components/SendPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import TxLoadingOverlay from './TxLoadingOverlay';

const SendPage = ({ user, onBack, onTxSuccess, onTxFailure }) => {
  const [balance, setBalance] = useState(null);
  const [form, setForm] = useState({ email: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const res = await api.get('/api/Bank/my-balance');
        const data = res.data;
        const tokenBalance =
          data.tokenBalance ??
          data.ptBalance ??
          data.balance ??
          data.amount ??
          0;
        setBalance(tokenBalance);
      } catch (e) {
        console.error('loadBalance error:', e);
      }
    };
    loadBalance();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    try {
      const payload = {
        recipientEmail: form.email,          // 🔥 must match backend
        amount: Number(form.amount),
      };
      console.log('send-email payload:', payload);

      const res = await api.post('/api/Transfer/send-email', payload);
      const data = res.data;
      console.log('send-email response:', data);

      const txInfo = {
        direction: 'outgoing',
        recipientEmail: form.email,
        toName: data.toName ?? data.recipientName ?? form.email,
        amount: Number(form.amount),
        status: data.status ?? 'Completed',
        polygonUrl:
          data.polygonUrl ??
          data.explorerLink ??
          data.explorerUrl ??
          data.polygonscanUrl ??
          data.txUrl ??
          '',
        accountId: data.accountId ?? user?.walletAddress ?? user?.WalletAddress ?? '',
        createdAt: data.timestamp ?? data.createdAt ?? new Date().toISOString(),
      };

      onTxSuccess?.(txInfo);
    } catch (err) {
      console.error('send-email error:', err);
      console.log('error response data:', err.response?.data);

      const raw = err.response?.data;
      let reason;

      if (typeof raw === 'string') {
        reason = raw;
      } else if (raw?.message) {
        reason = raw.message;
      } else if (raw?.Error) {
        reason = raw.Error;
      } else if (raw?.errors) {
        // ASP.NET validation errors
        reason = JSON.stringify(raw.errors);
      } else {
        reason = err.message || 'Transfer failed';
      }

      setMsg(reason);

      const txInfo = {
        direction: 'outgoing',
        recipientEmail: form.email,
        amount: Number(form.amount),
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
    <div className="send-page">
      {loading && <TxLoadingOverlay />}

      <div className="send-header">
        <button className="topup-back" onClick={onBack}>
          ←
        </button>
        <div className="send-title-area">
          <div className="topup-title">Send Tokens</div>
          <div className="send-balance">
            Available balance:{' '}
            <strong>
              {balance != null ? `${balance} PT` : '–'}
            </strong>
          </div>
        </div>
      </div>

      <div className="send-card">
        <form onSubmit={handleSubmit}>
          <input
            className="home-input"
            type="email"
            placeholder="Recipient e-mail"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />
          <input
            className="home-input"
            type="number"
            min="0"
            step="0.0001"
            placeholder="Amount (PT)"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            required
          />
          <button
            className="btn-primary home-action-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sending…' : 'Send'}
          </button>
        </form>
        {msg && <div className="home-action-message">{msg}</div>}
      </div>

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

export default SendPage;
