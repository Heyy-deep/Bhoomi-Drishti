import React from 'react';
import { MapPin, Cpu, Activity, ShieldCheck, Globe, BarChart3, PlusCircle, Smartphone, LogOut } from 'lucide-react';

export default function Navbar({ activeModule, setActiveModule, language, setLanguage, onOpenProposal, user, onLogout }) {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Section */}
        <div className="brand-section">
          <div className="brand-icon">
            <MapPin className="icon-main" />
          </div>
          <div>
            <div className="brand-title">
              BhoomiDrishti <span className="brand-tag">DPI</span>
            </div>
            <div className="brand-subtitle">
              {language === 'HI' ? 'राष्ट्रीय भूमि अधिग्रहण एवं प्रबंधन डिजिटल प्रणाली' : 'National Land Acquisition & Management Platform'}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeModule === 'mis' ? 'active' : ''}`}
            onClick={() => setActiveModule('mis')}
          >
            <BarChart3 className="tab-icon" />
            <span>{language === 'HI' ? 'एमआईएस डैशबोर्ड' : 'National MIS'}</span>
          </button>

          <button
            className={`nav-tab ${activeModule === 'gis' ? 'active' : ''}`}
            onClick={() => setActiveModule('gis')}
          >
            <MapPin className="tab-icon" />
            <span>{language === 'HI' ? 'GIS एवं चरण ट्रैकर' : 'GIS & Stage Tracker'}</span>
          </button>

          <button
            className={`nav-tab ${activeModule === 'workflow' ? 'active' : ''}`}
            onClick={() => setActiveModule('workflow')}
          >
            <ShieldCheck className="tab-icon" />
            <span>{language === 'HI' ? 'कार्यप्रवाह एवं SLA' : 'Workflow & SLAs'}</span>
          </button>

          <button
            className={`nav-tab ${activeModule === 'predictor' ? 'active' : ''}`}
            onClick={() => setActiveModule('predictor')}
          >
            <Activity className="tab-icon" />
            <span>{language === 'HI' ? 'ML विलंब प्रेडिक्टर' : 'ML Delay Predictor'}</span>
          </button>

          <button
            className={`nav-tab ${activeModule === 'mobile' ? 'active' : ''}`}
            onClick={() => setActiveModule('mobile')}
          >
            <Smartphone className="tab-icon" />
            <span>{language === 'HI' ? 'फील्ड मोबाइल ऐप' : 'Field Mobile App'}</span>
          </button>

          <button
            className={`nav-tab ${activeModule === 'public' ? 'active' : ''}`}
            onClick={() => setActiveModule('public')}
          >
            <Globe className="tab-icon" />
            <span>{language === 'HI' ? 'जन पारदर्शिता पोर्टल' : 'Public Portal'}</span>
          </button>
        </nav>

        {/* Right Controls */}
        <div className="navbar-actions">
          {/* Submit Proposal Trigger */}
          <button className="proposal-btn" onClick={onOpenProposal}>
            <PlusCircle className="pitch-icon" />
            <span>Submit Proposal</span>
          </button>

          {/* User profile & Logout */}
          {user && (
            <div className={`user-profile-badge ${activeModule === 'profile' ? 'active' : ''}`}>
              <div 
                className="user-avatar" 
                title="View Profile / प्रोफाइल देखें"
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveModule('profile')}
              >
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div 
                className="user-details"
                title="View Profile / प्रोफाइल देखें"
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveModule('profile')}
              >
                <span className="user-name-label">{user.name}</span>
                <span className="user-role-label">{user.role}</span>
              </div>
              <button 
                className="logout-icon-btn" 
                onClick={onLogout} 
                title="Log Out / लॉग आउट"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
