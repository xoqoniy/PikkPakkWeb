// src/components/Register.jsx
import React, { useState } from 'react';
import api from '../api/axios';

const Register = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      alert('Please accept Terms & Conditions of service.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/api/Auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;
      console.log('Register response:', data);

      alert(data.Message || 'Registration successful! Wallet created.');
      onSwitch(); // go back to login
    } catch (error) {
      console.error(error);
      const msg =
        error.response?.data ??
        error.response?.data?.message ??
        error.message ??
        'Registration failed';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="brand-header">
        <div className="logo-row">
          <div className="logo-box">P</div>
          <span className="brand-text">PikkPakk</span>
        </div>
        <span className="powered-by">
          powered by <strong>OTPBank</strong>
        </span>
      </div>

      <div className="auth-card">
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              className="auth-input"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="input-group">
            <input
              className="auth-input"
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="input-group password-group">
            <input
              className="auth-input"
              type={showPass1 ? 'text' : 'password'}
              placeholder="New Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowPass1((v) => !v)}
            >
              {showPass1 ? '🙈' : '👁️'}
            </button>
          </div>

          <div className="input-group password-group">
            <input
              className="auth-input"
              type={showPass2 ? 'text' : 'password'}
              placeholder="Repeat Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowPass2((v) => !v)}
            >
              {showPass2 ? '🙈' : '👁️'}
            </button>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <span>Accept Terms & Conditions of service</span>
          </label>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Registering…' : 'Register'}
          </button>
        </form>

        <button onClick={onSwitch} className="btn-secondary">
          Back to Login
        </button>
      </div>

      <div className="bottom-nav">
        <div className="bottom-item">
          <span className="bottom-icon">💬</span>
          <span>Need help?</span>
        </div>
        <div className="bottom-item">
          <span className="bottom-icon">☰</span>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
