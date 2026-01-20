// src/home-components/TransactionsPage.jsx
import React from 'react';

const TransactionsPage = ({ transactions, onBack, onOpenTxReceipt, onOpenSettings }) => {
  const txList = transactions || [];

  return (
    <div className="page home-page">
      <div className="send-header">
        <button className="topup-back" onClick={onBack}>
          ←
        </button>
        <div className="send-title-area">
          <div className="topup-title">Transactions</div>
        </div>
      </div>

      <div className="home-section">
        {(!transactions || transactions.length === 0) ? (
          <div className="home-no-tx">No transactions yet.</div>
        ) : (
          <div className="home-tx-list">
            {transactions.map((tx) => {
              const isIncoming = tx.direction === 'incoming';
              const sign = isIncoming ? '+' : '-';
              const counterparty =
                tx.recipientEmail || tx.fromEmail || tx.toName || 'Unknown';

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


      <nav className="home-bottom-nav">
        <div
          className="home-bottom-item"
          onClick={onBack}
        >
          <span>🏠</span>
          <span>Home</span>
        </div>
        <div className="home-bottom-item home-bottom-item-active">
          <span>📄</span>
          <span>Transactions</span>
        </div>
        <div className="home-bottom-item">
          <span>💳</span>
          <span>Payment</span>
        </div>
        <div
          className="home-bottom-item"
          onClick={onOpenSettings}
        >
          <span>⚙️</span>
          <span>Settings</span>
        </div>
      </nav>
    </div>
  );
};

export default TransactionsPage;
