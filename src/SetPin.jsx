// src/SetPin.jsx
import React, { useState, useEffect } from 'react';

const PIN_LENGTH = 6;

const SetPin = ({ onComplete }) => {
  const [step, setStep] = useState('create');   // 'create' or 'confirm'
  const [firstPin, setFirstPin] = useState('');
  const [currentPin, setCurrentPin] = useState('');
  const [error, setError] = useState('');

  // When the PIN length reaches PIN_LENGTH, advance flow
  useEffect(() => {
    if (currentPin.length !== PIN_LENGTH) return;

    if (step === 'create') {
      setFirstPin(currentPin);
      setCurrentPin('');
      setStep('confirm');
    } else {
      if (currentPin === firstPin) {
        // Save locally (you can also call backend here if you add an endpoint)
        localStorage.setItem('pin', currentPin);
        if (onComplete) onComplete();
      } else {
        setError('PINs do not match. Try again.');
        setCurrentPin('');
      }
    }
  }, [currentPin, step, firstPin, onComplete]);

  const handleDigit = (digit) => {
    if (currentPin.length >= PIN_LENGTH) return;
    setCurrentPin((prev) => prev + digit);
    setError('');
  };

  const handleBackspace = () => {
    if (!currentPin) return;
    setCurrentPin((prev) => prev.slice(0, -1));
    setError('');
  };

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="page pin-page">
      <div className="pin-header">
        <h2>Enter PIN</h2>
        <p className="pin-subtitle">
          {step === 'create'
            ? 'Create a 6-digit PIN code'
            : 'Confirm your PIN code'}
        </p>
      </div>

      <div className="pin-dots-box">
        <span className="pin-dots-label">PIN code required</span>
        <div className="pin-dots-row">
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <span
              key={i}
              className={
                'pin-dot' + (i < currentPin.length ? ' filled' : '')
              }
            />
          ))}
        </div>
      </div>

      {error && <div className="pin-error">{error}</div>}

      <div className="pin-keypad">
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
        className="btn-primary pin-forgot-btn"
        onClick={() => alert('Hook Forgot PIN later')}
      >
        Forgot PIN?
      </button>
    </div>
  );
};

export default SetPin;
