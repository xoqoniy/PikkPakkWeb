// src/App.js
import React, { useState } from 'react';
import './css/App.css';
import './css/Operations.css';
import './css/Home.css';

import SplashScreen from './SplashScreen';
import LandingScreen from './LandingScreen';
import Login from './components/Login';
import Register from './components/Register';
import SetPin from './SetPin';
import Home from './Home';

import TopUpPage from './home-components/TopUpPage';
import ReceivePage from './home-components/ReceivePage';
import SendPage from './home-components/SendPage';
import ConvertPage from './home-components/ConvertPage';
import ScanQrPage from './home-components/ScanQrPage';
import SendFromQrPage from './home-components/SendFromQrPage';
import TransactionReceiptPage from './home-components/TransactionReceiptPage';
import TransactionsPage from './home-components/TransactionsPage';
import SettingsPage from './home-components/SettingsPage';

import api from './api/axios'; // axios wrapper with JWT

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [user, setUser] = useState(null);

  // for QR-based sending
  const [qrEmail, setQrEmail] = useState('');

  // all transactions (sent / received from backend)
  const [transactions, setTransactions] = useState([]);

  // the transaction currently shown on the receipt page
  const [currentTx, setCurrentTx] = useState(null);

  const goHome = () => setCurrentScreen('home');

  // load full history from backend
  const refreshTransactions = async () => {
    try {
      const res = await api.get('/api/Transactions/my-history');
      setTransactions(res.data || []);
    } catch (err) {
      console.error('Failed to load transactions', err);
    }
  };

  // after login: set user, load history, go to PIN setup
  const handleLoginSuccess = async (userData) => {
    setUser(userData);
    await refreshTransactions();
    setCurrentScreen('set-pin'); // after login, go to PIN setup
  };

  // when a tx succeeds (send or send-from-qr)
  const handleTxSuccess = async (txInfo) => {
    setCurrentTx(txInfo);
    await refreshTransactions();
    setCurrentScreen('tx-receipt');
  };

  // on failure: just show receipt with error
  const handleTxFailure = (txInfo) => {
    setCurrentTx(txInfo);
    setCurrentScreen('tx-receipt');
  };

  // logout: clear token + state and go to landing (login/register)
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setTransactions([]);
    setCurrentTx(null);
    setQrEmail('');
    setCurrentScreen('landing');
  };

  return (
    <div className="App">
      {/* SPLASH */}
      {currentScreen === 'splash' && (
        <SplashScreen onFinish={() => setCurrentScreen('landing')} />
      )}

      {/* LANDING */}
      {currentScreen === 'landing' && (
        <LandingScreen
          onLogin={() => setCurrentScreen('login')}
          onRegister={() => setCurrentScreen('register')}
        />
      )}

      {/* LOGIN */}
      {currentScreen === 'login' && (
        <Login
          onSwitch={() => setCurrentScreen('register')}
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* REGISTER */}
      {currentScreen === 'register' && (
        <Register onSwitch={() => setCurrentScreen('login')} />
      )}

      {/* SET PIN */}
      {currentScreen === 'set-pin' && (
        <SetPin onComplete={goHome} />
      )}

      {/* HOME */}
      {currentScreen === 'home' && (
        <Home
          user={user}
          transactions={transactions}
          onSend={() => setCurrentScreen('send')}
          onReceive={() => setCurrentScreen('receive')}
          onTopUp={() => setCurrentScreen('topup')}
          onConvert={() => setCurrentScreen('convert')}
          onScanQr={() => setCurrentScreen('scan-qr')}
          onOpenTransactions={() => setCurrentScreen('transactions')}
          onOpenTxReceipt={(tx) => {
            setCurrentTx(tx);
            setCurrentScreen('tx-receipt');
          }}
          onOpenSettings={() => setCurrentScreen('settings')}
        />
      )}

      {/* SEND (manual) */}
      {currentScreen === 'send' && (
        <SendPage
          user={user}
          onBack={goHome}
          onTxSuccess={handleTxSuccess}
          onTxFailure={handleTxFailure}
        />
      )}

      {/* RECEIVE (own QR) */}
      {currentScreen === 'receive' && (
        <ReceivePage
          user={user}
          onBack={goHome}
        />
      )}

      {/* SCAN QR (camera) */}
      {currentScreen === 'scan-qr' && (
        <ScanQrPage
          onBack={goHome}
          onScannedEmail={(email) => {
            setQrEmail(email);
            setCurrentScreen('send-from-qr');
          }}
        />
      )}

      {/* SEND-FROM-QR */}
      {currentScreen === 'send-from-qr' && (
        <SendFromQrPage
          email={qrEmail}
          onBack={goHome}
          onTxSuccess={handleTxSuccess}
          onTxFailure={handleTxFailure}
        />
      )}

      {/* TOP-UP */}
      {currentScreen === 'topup' && (
        <TopUpPage
          user={user}
          onBack={goHome}
        />
      )}

      {/* CONVERT */}
      {currentScreen === 'convert' && (
        <ConvertPage
          user={user}
          onBack={goHome}
        />
      )}

      {/* FULL TRANSACTIONS LIST */}
      {currentScreen === 'transactions' && (
        <TransactionsPage
          transactions={transactions}
          onBack={goHome}
          onOpenTxReceipt={(tx) => {
            setCurrentTx(tx);
            setCurrentScreen('tx-receipt');
          }}
          onOpenSettings={() => setCurrentScreen('settings')}
        />
      )}

      {/* SETTINGS */}
      {currentScreen === 'settings' && (
        <SettingsPage
          user={user}
          onBack={goHome}
          onLogout={handleLogout}
        />
      )}

      {/* RECEIPT PAGE */}
      {currentScreen === 'tx-receipt' && currentTx && (
        <TransactionReceiptPage
          tx={currentTx}
          onBack={goHome}
        />
      )}
    </div>
  );
}

export default App;
