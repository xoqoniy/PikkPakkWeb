// src/home-components/TransactionReceiptPage.jsx
import React from 'react';

const TransactionReceiptPage = ({ tx, onBack }) => {
  if (!tx) {
    return (
      <div className="page tx-page">
        <div className="tx-header">
          <button className="topup-back" onClick={onBack}>
            ←
          </button>
          <h2>Transaction Receipt</h2>
        </div>
        <p style={{ padding: 16 }}>No transaction data.</p>
      </div>
    );
  }

  const created = tx.createdAt ? new Date(tx.createdAt) : new Date();
  const timeStr = created.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateStr = created.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const recipientName =
    tx.toName || tx.toEmail || 'Recipient';

  const avatarLetter = recipientName[0]?.toUpperCase() || 'R';

  const statusLabel = tx.status || (tx.error ? 'Failed' : 'Completed');
  const statusIsSuccess = statusLabel.toLowerCase() === 'completed';

  return (
    <div className="page tx-page">
      {/* green header */}
      <div className="tx-header">
        <button className="topup-back" onClick={onBack}>
          ←
        </button>
        <h2>Transaction Receipt</h2>
      </div>

      {/* white card */}
      <div className="tx-card">
        {/* card top: avatar + name + amount */}
        <div className="tx-card-top">
          <div className="tx-avatar">{avatarLetter}</div>
          <div className="tx-recipient-block">
            <div className="tx-recipient-name">{recipientName}</div>
            {tx.toEmail && (
              <div className="tx-recipient-email">{tx.toEmail}</div>
            )}
          </div>
          <div className="tx-amount-block">
            <div className="tx-amount-main">
              {tx.amount?.toLocaleString?.() ?? tx.amount ?? '-'} PT
            </div>
          </div>
        </div>

        {/* details rows */}
        <div className="tx-row">
          <div className="tx-row-label">Account ID</div>
          <div className="tx-row-value">
            {tx.accountId || tx.fromWallet || '—'}
          </div>
        </div>

        <div className="tx-row">
          <div className="tx-row-label">Status</div>
          <div
            className={
              'tx-row-value ' +
              (statusIsSuccess ? 'tx-status-ok' : 'tx-status-fail')
            }
          >
            {statusLabel}
          </div>
        </div>

        <div className="tx-row">
          <div className="tx-row-label">Time</div>
          <div className="tx-row-value">{timeStr}</div>
        </div>

        <div className="tx-row">
          <div className="tx-row-label">Date</div>
          <div className="tx-row-value">{dateStr}</div>
        </div>

        {tx.error && (
          <div className="tx-row">
            <div className="tx-row-label">Reason</div>
            <div className="tx-row-value tx-status-fail">
              {tx.error}
            </div>
          </div>
        )}

        <div className="tx-row">
          <div className="tx-row-label">Polygon</div>
          <div className="tx-row-value">
            {tx.polygonUrl ? (
              <button
                type="button"
                className="tx-link-button"
                onClick={() => window.open(tx.polygonUrl, '_blank')}
              >
                View on Polygon
              </button>
            ) : (
              '—'
            )}
          </div>
        </div>

        {/* bottom pill button */}
        {tx.polygonUrl && (
          <button
            type="button"
            className="tx-blockchain-pill"
            onClick={() => window.open(tx.polygonUrl, '_blank')}
          >
            🌐 Blockchain
          </button>
        )}
      </div>

      {/* bottom nav, same as other pages */}
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

export default TransactionReceiptPage;
