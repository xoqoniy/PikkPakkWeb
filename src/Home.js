// src/Home.js
import React, { useEffect, useState } from 'react';
import api from './api/axios';

// ICONS
import sendIcon from './assets/images/send.svg';
import receiveIcon from './assets/images/Receive.svg';
import topupIcon from './assets/images/Top-up.svg';
import convertIcon from './assets/images/Convert.svg';
// use your QR icon name here – adjust the filename if needed
import scanQrIcon from './assets/images/scanqr.svg';
import HomeNavIcon from './assets/images/home.svg';
import PaymentNavIcon from './assets/images/Payment.svg';
import TransactionsNavIcon from './assets/images/transactions-icon.svg';
import SettingsNavIcon from './assets/images/settings-icon.svg';
// helper: safely turn anything into a number (or 0)
const toSafeNumber = (value) => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }
  if (value == null) return 0;

  const cleaned = String(value).replace(/[^\d.-]/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
};

const Home = ({
  user,
  transactions,
  onSend,
  onReceive,
  onTopUp,
  onConvert,
  onScanQr,
  onOpenTransactions,
  onOpenTxReceipt,
}) => {
  const [balance, setBalance] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [balanceError, setBalanceError] = useState('');

  const quickContacts = [
    { name: 'Anna' },
    { name: 'Gábor' },
    { name: 'Dániel' },
    { name: 'Nóra' },
  ];

  useEffect(() => {
    const fetchBalance = async () => {
      setBalanceLoading(true);
      setBalanceError('');

      try {
        const res = await api.get('/api/Bank/my-balance');
        const data = res.data;

        const rawToken =
          data.tokenBalance ??
          data.ptBalance ??
          data.balance ??
          data.amount ??
          0;

        const tokenBalance = toSafeNumber(rawToken);

        // simple 1:1 mapping PT -> HUF for now
        const CONVERSION_RATE = 1;
        const hufBalance = tokenBalance * CONVERSION_RATE;

        setBalance({
          token: tokenBalance,
          huf: hufBalance,
        });
      } catch (err) {
        console.error(err);
        setBalanceError(
          err.response?.data?.message ||
            err.response?.data ||
            err.message ||
            'Failed to load balance'
        );
      } finally {
        setBalanceLoading(false);
      }
    };

    fetchBalance();
  }, []);

  const displayName = user?.name || user?.Name || 'Guest';
  const walletAddress = user?.walletAddress || user?.WalletAddress || '';
  const shortWallet =
    walletAddress && walletAddress.length > 12
      ? walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4)
      : walletAddress || 'No wallet address';

  const token = balance?.token ?? 0;
  const huf = balance?.huf ?? 0;

  const mainAmountText = balanceLoading
    ? 'Loading…'
    : balanceError
    ? 'Error'
    : `${token.toLocaleString()} PT`;

  const hufText = balanceError
    ? '= – HUF'
    : `= ${huf.toLocaleString()} HUF`;

  const txList = transactions || [];

  return (
    <div className="page home-page">
      {/* HEADER + BALANCE CARD */}
      <div className="home-header">
        <div className="home-balance-card">
          {/* top row */}
          <div className="home-card-top">
            <div className="home-user-info">
              <div className="home-avatar">
                {displayName[0] || 'G'}
              </div>
              <div>
                <div className="home-welcome">Welcome</div>
                <div className="home-name">{displayName}</div>
              </div>
            </div>

            <button
              type="button"
              className="home-icon-button"
              onClick={() => alert('Notifications later')}
            >
              🔔
            </button>
          </div>

          {/* middle: PT + HUF */}
          <div className="home-card-middle">
            <div className="home-basic-label">Basic account</div>

            <div className="home-balance-main">{mainAmountText}</div>

            <div className="home-balance-sub">{hufText}</div>
          </div>

          {/* bottom: wallet + QR icon */}
          <div className="home-card-bottom">
            <div>
              <div className="home-wallet-label">Wallet</div>
              <div className="home-wallet-value">{shortWallet}</div>
            </div>

            <button
              type="button"
              className="home-qr-button"
              onClick={onScanQr}
            >
              <img
                src={scanQrIcon}
                alt="Scan QR"
                className="home-qr-icon"
              />
            </button>
          </div>
        </div>

        {/* ACTION ROW */}
        <div className="home-actions-row">
          <HomeAction
            label="Send"
            iconSrc={sendIcon}
            onClick={onSend}
          />
          <HomeAction
            label="Receive"
            iconSrc={receiveIcon}
            onClick={onReceive}
          />
          <HomeAction
            label="Top-up"
            iconSrc={topupIcon}
            onClick={onTopUp}
          />
          <HomeAction
            label="Convert"
            iconSrc={convertIcon}
            onClick={onConvert}
          />
        </div>
      </div>

      {/* REMINDER CARD */}
      <div className="home-reminder-card">
        <div className="home-reminder-icon">💡</div>
        <div>
          <div className="home-reminder-title">Reminders</div>
          <div className="home-reminder-text">
            Use reminders to pay bills on time.
          </div>
        </div>
      </div>

      {/* QUICK TRANSFER SECTION */}
      <div className="home-section">
        <div className="home-section-header">
          <h3>Quick Transfer</h3>
          <button
            type="button"
            className="home-mini-link"
            onClick={() => alert('Open full contacts later')}
          >
            ›
          </button>
        </div>

        <div className="home-quick-row">
          {quickContacts.map((c) => (
            <div key={c.name} className="home-quick-item">
              <div className="home-quick-avatar">{c.name[0]}</div>
              <div className="home-quick-name">{c.name}</div>
            </div>
          ))}
        </div>
      </div>

           {/* TRANSACTIONS SECTION */}
      <div className="home-section">
        <div className="home-section-header">
          <h3>Transactions</h3>
          <button
            type="button"
            className="home-mini-link"
            onClick={onOpenTransactions}
          >
            ›
          </button>
        </div>

        {txList.length === 0 ? (
          <div className="home-no-tx">No transactions yet.</div>
        ) : (
          <div className="home-tx-list">
            {txList.slice(0, 3).map((tx) => {
              const isIncoming = tx.direction === 'incoming';
              const sign = isIncoming ? '+' : '-';
              const counterparty =
                tx.recipientEmail ||
                tx.fromEmail ||
                tx.toName ||
                'Unknown';

              return (
                <button
                  key={tx.id}
                  type="button"
                  className="home-tx-card"
                  onClick={() => onOpenTxReceipt(tx)}
                >
                  <div className="home-tx-left">
                    <div className="home-tx-icon">
                      {isIncoming ? '⬇️' : '⬆️'}
                    </div>
                    <div>
                      <div className="home-tx-title">{counterparty}</div>
                      <div className="home-tx-sub">
                        {isIncoming ? 'Received' : 'Sent'} ·{' '}
                        {new Date(tx.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      'home-tx-amount ' +
                      (isIncoming
                        ? 'home-tx-amount-in'
                        : 'home-tx-amount-out')
                    }
                  >
                    {sign} {tx.amount} PT
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

     {/* BOTTOM NAV */}
      <nav className="home-bottom-nav">
        <button
          type="button"
          className="home-bottom-item home-bottom-item-active"
        >
          <img
            src={HomeNavIcon}
            alt="Home"
            className="home-bottom-icon"
          />
          <span>Home</span>
        </button>

        <button
          type="button"
          className="home-bottom-item"
          onClick={onSend}
        >
          <img
            src={PaymentNavIcon}
            alt="Payment"
            className="home-bottom-icon"
          />
          <span>Payment</span>
        </button>

        <button
          type="button"
          className="home-bottom-item"
          onClick={onOpenTransactions}
        >
          <img
            src={TransactionsNavIcon}
            alt="Transactions"
            className="home-bottom-icon"
          />
          <span>Transactions</span>
        </button>

        <button
          type="button"
          className="home-bottom-item"
          onClick={() => alert('Settings page hook')}
        >
          <img
            src={SettingsNavIcon}
            alt="Settings"
            className="home-bottom-icon"
          />
          <span>Settings</span>
        </button>
      </nav>

    </div>
  );
};

const HomeAction = ({ iconSrc, label, onClick }) => (
  <button type="button" className="home-action" onClick={onClick}>
    <div className="home-action-circle">
      <img src={iconSrc} alt={label} className="home-action-icon" />
    </div>
    <div className="home-action-label">{label}</div>
  </button>
);

export default Home;
