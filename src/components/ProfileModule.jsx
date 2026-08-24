import React, { useState } from 'react';
import { User, Mail, Shield, Building2, Briefcase, Calendar, CheckCircle, Save, X, ToggleLeft, ToggleRight, Info, Award } from 'lucide-react';

const MOCK_ACCOUNTS_KEY = 'bhoomidrishti_mock_accounts';

export default function ProfileModule({ user, setUser, language }) {
  const [name, setName] = useState(user.name || '');
  const [role, setRole] = useState(user.role || 'NHAI Officer');
  const [agency, setAgency] = useState(user.agency || 'N/A');
  const [twoFactor, setTwoFactor] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !role) {
      setError('Name and Role are mandatory fields.');
      return;
    }

    // 1. Update current session user details
    const updatedUser = {
      ...user,
      name,
      role,
      agency: agency || 'N/A'
    };

    // 2. Update matching record in the registered accounts database (localStorage)
    const storedAccounts = localStorage.getItem(MOCK_ACCOUNTS_KEY);
    if (storedAccounts) {
      const accounts = JSON.parse(storedAccounts);
      const index = accounts.findIndex(acc => acc.email.toLowerCase() === user.email.toLowerCase());
      if (index !== -1) {
        accounts[index] = {
          ...accounts[index],
          name,
          role,
          agency: agency || 'N/A'
        };
        localStorage.setItem(MOCK_ACCOUNTS_KEY, JSON.stringify(accounts));
      }
    }

    // 3. Save new user session
    setUser(updatedUser);
    localStorage.setItem('bhoomidrishti_current_user', JSON.stringify(updatedUser));

    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleReset = () => {
    setName(user.name || '');
    setRole(user.role || 'NHAI Officer');
    setAgency(user.agency || 'N/A');
    setError('');
    setSuccess('');
  };

  // Dynamic stats content based on role
  const getRoleStats = () => {
    switch (role) {
      case 'NHAI Officer':
        return [
          { label: 'Proposals Submitted', value: '14', color: 'var(--accent-gold)' },
          { label: 'Feasibility Reports', value: '8', color: 'var(--accent-blue)' },
          { label: 'Pending Approvals', value: '3', color: 'var(--accent-purple)' }
        ];
      case 'Revenue Inspector':
        return [
          { label: 'Field Inspections', value: '47', color: 'var(--accent-green)' },
          { label: 'Geotagged Survey Parcels', value: '32', color: 'var(--accent-blue)' },
          { label: 'Valuation Submissions', value: '19', color: 'var(--accent-gold)' }
        ];
      case 'Public Citizen':
        return [
          { label: 'Grievances Filed', value: '2', color: 'var(--accent-red)' },
          { label: 'Compensation Claims', value: '1', color: 'var(--accent-green)' },
          { label: 'Parcels Tracked', value: '4', color: 'var(--accent-blue)' }
        ];
      default: // Admin
        return [
          { label: 'Users Supervised', value: '124', color: 'var(--accent-purple)' },
          { label: 'Audit Logs Reviewed', value: '840', color: 'var(--accent-blue)' },
          { label: 'System Uptime', value: '99.99%', color: 'var(--accent-green)' }
        ];
    }
  };

  return (
    <div className="profile-container">
      {/* Background ambient glow */}
      <div className="profile-glow"></div>

      <div className="profile-grid">
        {/* Left Side: Avatar Card & Stats */}
        <div className="profile-card-left">
          <div className="avatar-large-container">
            <div className="avatar-large">
              {name ? name[0].toUpperCase() : 'U'}
            </div>
            <h2 className="profile-display-name">{name}</h2>
            <p className="profile-display-role">{role}</p>
            <p className="profile-display-agency">{agency}</p>
          </div>

          <div className="profile-meta-info">
            <div className="meta-row">
              <Calendar size={15} className="meta-icon" />
              <span>Registered: August 2026</span>
            </div>
            <div className="meta-row">
              <Shield size={15} className="meta-icon" />
              <span>Status: Verified Officer</span>
            </div>
          </div>

          <hr className="profile-divider" />

          {/* Role specific Stats */}
          <h3 className="profile-subheading">Activity Summary</h3>
          <div className="profile-stats-grid">
            {getRoleStats().map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Edit Form & Preferences */}
        <div className="profile-card-right">
          <h2 className="profile-header-title">Account Details</h2>
          <p className="profile-header-subtitle">Update your personal information and application preferences.</p>

          {error && <div className="auth-alert error">{error}</div>}
          {success && <div className="auth-alert success">{success}</div>}

          <form onSubmit={handleSave} className="profile-form">
            <div className="profile-form-grid">
              <div className="form-group">
                <label htmlFor="prof-name">Full Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" />
                  <input
                    type="text"
                    id="prof-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="prof-email">Email Address (Read-only)</label>
                <div className="input-wrapper disabled">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    id="prof-email"
                    value={user.email}
                    disabled
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="prof-role">Designation / Role</label>
                <div className="input-wrapper">
                  <Briefcase className="input-icon" />
                  <select
                    id="prof-role"
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
                <label htmlFor="prof-agency">Agency / Department</label>
                <div className="input-wrapper">
                  <Building2 className="input-icon" />
                  <input
                    type="text"
                    id="prof-agency"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button type="submit" className="save-profile-btn">
                <Save size={16} />
                <span>Save Profile Changes</span>
              </button>
              <button type="button" onClick={handleReset} className="cancel-profile-btn">
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          </form>

          <hr className="profile-divider" />

          {/* Preferences and Settings */}
          <h3 className="profile-subheading">Security & Preferences</h3>
          <div className="preferences-list">
            <div className="preference-item">
              <div className="pref-info">
                <div className="pref-title">Two-Factor Authentication (2FA)</div>
                <div className="pref-desc">Secure your land registry account with OTP validations on mobile.</div>
              </div>
              <button
                type="button"
                className="pref-toggle-btn"
                onClick={() => setTwoFactor(!twoFactor)}
              >
                {twoFactor ? <ToggleRight size={38} className="toggle-icon active" /> : <ToggleLeft size={38} className="toggle-icon" />}
              </button>
            </div>

            <div className="preference-item">
              <div className="pref-info">
                <div className="pref-title">Desktop Notifications</div>
                <div className="pref-desc">Get real-time updates when an SLA target is nearing escalation.</div>
              </div>
              <button
                type="button"
                className="pref-toggle-btn"
                onClick={() => setNotifications(!notifications)}
              >
                {notifications ? <ToggleRight size={38} className="toggle-icon active" /> : <ToggleLeft size={38} className="toggle-icon" />}
              </button>
            </div>
          </div>

          <div className="profile-info-callout">
            <Info size={16} className="callout-icon" />
            <span className="callout-text">
              Active Session: Authenticated via Local Government DPI Node. Security Key hash is SHA-256 validated.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
