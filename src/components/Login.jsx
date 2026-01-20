// src/components/Login.jsx
import React, { useState } from 'react';
import api from '../api/axios';

const Login = ({ onSwitch, onSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/Auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;
      console.log('Login response:', data);

      // accept both camelCase and PascalCase from backend
      const token = data.token || data.Token;
      if (!token) {
        console.error('Login response had no token property:', data);
        throw new Error('Token missing in response.');
      }

      if (rememberMe) {
        localStorage.setItem('token', token);
      }

      alert('Login successful ✅');

      const user = data.user || data.User || null;
      if (onSuccess) {
        onSuccess(user);
      }
    } catch (error) {
      console.error(error);
      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        'Login failed';
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
        <form onSubmit={handleSubmit}>
          {/* E-mail */}
          <div className="input-group">
            {/* If you added .auth-label in CSS you can uncomment this line */}
            {/* <div className="auth-label">E-mail</div> */}
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

          {/* Password */}
          <div className="input-group password-group">
            {/* <div className="auth-label">Password</div> */}
            <input
              className="auth-input"
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowPass((v) => !v)}
            >
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>

          <div className="auth-row">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="link-button"
              onClick={() => alert('Hook this later')}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <button onClick={onSwitch} className="btn-secondary">
          Register
        </button>
      </div>

      <div className="tip-card">
        <div className="tip-icon">💡</div>
        <p>
          Review transactions regularly and report anything unusual
          immediately.
        </p>
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

export default Login;
