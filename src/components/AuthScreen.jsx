import React, { useState } from 'react';
import { MapPin, User, Mail, Lock, Eye, EyeOff, ArrowRight, Building2, Briefcase } from 'lucide-react';

const MOCK_ACCOUNTS_KEY = 'bhoomidrishti_mock_accounts';
const DEFAULT_ACCOUNTS = [
  {
    name: 'Rajesh Kumar',
    email: 'officer@bhoomidrishti.gov.in',
    password: 'Password123',
    role: 'NHAI Officer',
    agency: 'NHAI HQ'
  },
  {
    name: 'Siddharth Sharma',
    email: 'inspector@bhoomidrishti.gov.in',
    password: 'Password123',
    role: 'Revenue Inspector',
    agency: 'Revenue Department'
  },
  {
    name: 'Amit Patel',
    email: 'citizen@gmail.com',
    password: 'Password123',
    role: 'Public Citizen',
    agency: 'N/A'
  }
];

export default function AuthScreen({ onLoginSuccess }) {
  const [viewMode, setViewMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('NHAI Officer');
  const [agency, setAgency] = useState('');

  // Password Reset Fields
  const [resetEmail, setResetEmail] = useState('');
  const [newResetPassword, setNewResetPassword] = useState('');
  const [confirmResetPassword, setConfirmResetPassword] = useState('');

  // Initial Accounts Setup
  React.useEffect(() => {
    if (!localStorage.getItem(MOCK_ACCOUNTS_KEY)) {
      localStorage.setItem(MOCK_ACCOUNTS_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
    }
  }, []);

  const getAccounts = () => {
    const stored = localStorage.getItem(MOCK_ACCOUNTS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_ACCOUNTS;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const accounts = getAccounts();
    const found = accounts.find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
    );

    if (found) {
      onLoginSuccess(found);
    } else {
      setError('Invalid email or password. Hint: officer@bhoomidrishti.gov.in / Password123');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password || !role) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const accounts = getAccounts();
    const exists = accounts.some(
      (acc) => acc.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      setError('An account with this email already exists.');
      return;
    }

    const newAccount = {
      name,
      email,
      password,
      role,
      agency: agency || 'N/A'
    };

    const updated = [...accounts, newAccount];
    localStorage.setItem(MOCK_ACCOUNTS_KEY, JSON.stringify(updated));

    setSuccess('Registration successful! Redirecting to login with pre-filled password...');
    
    // Automatically switch to login and pre-fill credentials for user convenience
    setTimeout(() => {
      setViewMode('login');
      setEmail(newAccount.email);
      setPassword(newAccount.password); // Autofill password so they can log in instantly!
      setSuccess('');
    }, 1500);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!resetEmail || !newResetPassword || !confirmResetPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newResetPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newResetPassword !== confirmResetPassword) {
      setError('Passwords do not match.');
      return;
    }

    const accounts = getAccounts();
    const accountIndex = accounts.findIndex(
      (acc) => acc.email.toLowerCase() === resetEmail.toLowerCase()
    );

    if (accountIndex === -1) {
      setError('No registered account found with this email address.');
      return;
    }

    // Update password
    accounts[accountIndex].password = newResetPassword;
    localStorage.setItem(MOCK_ACCOUNTS_KEY, JSON.stringify(accounts));

    setSuccess('Password updated successfully! Redirecting to login...');
    setTimeout(() => {
      setViewMode('login');
      setEmail(resetEmail);
      setPassword(newResetPassword); // Autofill updated password too!
      setSuccess('');
      // Clear fields
      setResetEmail('');
      setNewResetPassword('');
      setConfirmResetPassword('');
    }, 1500);
  };

  const switchTab = (mode) => {
    setViewMode(mode);
    setError('');
    setSuccess('');
  };

  return (
    <div className="auth-container">
      {/* Left Hero Panel */}
      <div className="auth-glow-bg">
        <div className="auth-hero-grid-bg" />
        <div className="auth-hero-content">
          <div className="auth-hero-icon">
            <MapPin size={28} />
          </div>
          <h1 className="auth-hero-title">
            Bhoomi<br /><span>Drishti</span>
          </h1>
          <p className="auth-hero-sub">
            National Land Acquisition &amp; Management Digital Platform — powering transparent, data-driven governance under RFCTLARR Act 2013.
          </p>
          <div className="auth-hero-stats">
            <div className="auth-hero-stat">
              <span className="auth-stat-val">19+</span>
              <span className="auth-stat-lbl">Active Projects</span>
            </div>
            <div className="auth-hero-stat">
              <span className="auth-stat-val">9</span>
              <span className="auth-stat-lbl">States Covered</span>
            </div>
            <div className="auth-hero-stat">
              <span className="auth-stat-val">₹620Cr</span>
              <span className="auth-stat-lbl">Compensation Tracked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-card">
        {/* Logo and Header */}
        <div className="auth-header">
          <div className="auth-brand-icon">
            <MapPin className="icon-main" />
          </div>
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">
            Sign in to your BhoomiDrishti account
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="auth-tabs">
          <button 
            type="button" 
            className={`auth-tab-btn ${viewMode === 'login' || viewMode === 'forgot' ? 'active' : ''}`}
            onClick={() => switchTab('login')}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className={`auth-tab-btn ${viewMode === 'signup' ? 'active' : ''}`}
            onClick={() => switchTab('signup')}
          >
            Register
          </button>
        </div>

        {/* Feedback Messages */}
        {error && <div className="auth-alert error">{error}</div>}
        {success && <div className="auth-alert success">{success}</div>}

        {/* Sign In Form */}
        {viewMode === 'login' && (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@agency.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className="show-pw-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                  <button
                    type="button"
                    className="show-pw-btn"
                    onClick={() => switchTab('forgot')}
                  >
                    <span>Forgot?</span>
                  </button>
                </div>
              </div>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {/* Quick Login Helpers */}
            <div className="quick-logins">
              <span className="quick-title">Quick Demo Login:</span>
              <div className="quick-buttons">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('officer@bhoomidrishti.gov.in');
                    setPassword('Password123');
                  }}
                  className="quick-btn"
                >
                  NHAI Officer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('inspector@bhoomidrishti.gov.in');
                    setPassword('Password123');
                  }}
                  className="quick-btn"
                >
                  Inspector
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              <span>Sign In to Dashboard</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* Sign Up / Register Form */}
        {viewMode === 'signup' && (
          <form className="auth-form" onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Dr. Rajesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@agency.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="role">Role / Designation</label>
                <div className="input-wrapper">
                  <Briefcase className="input-icon" />
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="NHAI Officer">NHAI Officer</option>
                    <option value="Revenue Inspector">Revenue Inspector</option>
                    <option value="Public Citizen">Public Citizen</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="agency">Agency / Organization</label>
                <div className="input-wrapper">
                  <Building2 className="input-icon" />
                  <input
                    type="text"
                    id="agency"
                    name="agency"
                    placeholder="NHAI HQ, Revenue Dept"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="new-password">Password</label>
                <button
                  type="button"
                  className="show-pw-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="new-password"
                  name="new-password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              <span>Create Account</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* Forgot / Reset Password Form */}
        {viewMode === 'forgot' && (
          <form className="auth-form" onSubmit={handleResetSubmit}>
            <div className="form-group">
              <label htmlFor="reset-email">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="reset-email"
                  name="reset-email"
                  placeholder="name@agency.gov.in"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="new-reset-password">New Password</label>
                <button
                  type="button"
                  className="show-pw-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="new-reset-password"
                  name="new-reset-password"
                  placeholder="Min. 6 characters"
                  value={newResetPassword}
                  onChange={(e) => setNewResetPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-reset-password">Confirm New Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirm-reset-password"
                  name="confirm-reset-password"
                  placeholder="Re-enter new password"
                  value={confirmResetPassword}
                  onChange={(e) => setConfirmResetPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              <span>Reset Password</span>
              <ArrowRight size={18} />
            </button>

            <button 
              type="button" 
              className="back-to-login-btn"
              onClick={() => switchTab('login')}
            >
              Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
