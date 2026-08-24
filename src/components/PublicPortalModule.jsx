import React, { useState } from 'react';
import { Search, Globe, CheckCircle, Clock, Shield, Phone, BellRing, Calculator, ArrowRight, Building, Award, Check } from 'lucide-react';
import { STAGE_CONFIG } from '../data/parcelsData';

export default function PublicPortalModule({ parcels, language }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedParcel, setSearchedParcel] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Compensation calculator state
  const [calcArea, setCalcArea] = useState(2.0); // Ha
  const [calcCircleRate, setCalcCircleRate] = useState(1500000); // ₹ per Ha
  const [calcLandType, setCalcLandType] = useState('RURAL_IRRIGATED');

  // SMS subscription state
  const [mobileNo, setMobileNo] = useState('');
  const [smsSubscribed, setSmsSubscribed] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchAttempted(true);
    if (!searchQuery.trim()) {
      setSearchedParcel(null);
      return;
    }

    const q = searchQuery.toLowerCase().trim();
    const found = parcels.find(
      p => p.khasraNo.toLowerCase().includes(q) ||
           p.ownerName.toLowerCase().includes(q) ||
           p.id.toLowerCase().includes(q)
    );
    setSearchedParcel(found || null);
  };

  // Calculator logic under RFCTLARR 2013 Act
  const multiplier = calcLandType === 'RURAL_IRRIGATED' ? 2.0 : 1.25;
  const baseValue = calcArea * calcCircleRate * multiplier;
  const solatium = baseValue * 1.0; // 100% solatium
  const interest = baseValue * 0.12; // 12% annual interest estimate
  const totalEstCompensation = baseValue + solatium + interest;

  const handleSmsSubmit = (e) => {
    e.preventDefault();
    if (mobileNo.trim().length >= 10) {
      setSmsSubscribed(true);
    }
  };

  return (
    <div className="module-layout">
      {/* Hero Banner */}
      <div className="public-hero-banner">
        <div className="hero-badge">
          <Globe className="badge-globe" /> {language === 'HI' ? 'भारत सरकार • राजस्व एवं भूमि सुधार मंत्रालय' : 'Govt of India • Ministry of Rural Development'}
        </div>
        <h1 className="hero-title">
          {language === 'HI'
            ? 'जन भूमि अधिग्रहण पारदर्शिता एवं मुआवजा पोर्टल'
            : 'Public Land Acquisition Status & Compensation Transparency Portal'}
        </h1>
        <p className="hero-sub">
          {language === 'HI'
            ? 'अपने खसरा नंबर, आधार या नाम द्वारा भूमि अधिग्रहण की स्थिति, मुआवजा राशि एवं प्रत्यक्ष लाभ अंतरण (DBT) की जानकारी प्राप्त करें।'
            : 'Track legal acquisition stages (Section 4, 11, 19), calculate compensation awards under RFCTLARR Act 2013, and receive instant SMS alerts.'}
        </p>

        {/* Big Search Bar */}
        <form onSubmit={handleSearch} className="public-search-form">
          <div className="search-input-wrapper">
            <Search className="public-search-icon" />
            <input
              type="text"
              placeholder={language === 'HI' ? 'खसरा नंबर (उदा. 142/1A), नाम या भूमि आईडी दर्ज करें...' : 'Enter Khasra No (e.g. 142/1A), Landowner Name, or Parcel ID...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="public-search-btn">
              {language === 'HI' ? 'स्थिति खोजें' : 'Search Status'} <ArrowRight className="btn-arrow" />
            </button>
          </div>
          <div className="search-hints">
            <span>Try sample searches:</span>
            <button type="button" onClick={() => { const p = parcels.find(x => x.khasraNo === '304/1A'); setSearchQuery('304/1A'); setSearchedParcel(p || parcels[0]); setSearchAttempted(true); }}>Khasra 304/1A (Kolkata Metro)</button>
            <button type="button" onClick={() => { const p = parcels.find(x => x.khasraNo === '512/8B'); setSearchQuery('512/8B'); setSearchedParcel(p || parcels[1]); setSearchAttempted(true); }}>Khasra 512/8B (Kolkata Port)</button>
            <button type="button" onClick={() => { const p = parcels.find(x => x.khasraNo === '142/1A'); setSearchQuery('142/1A'); setSearchedParcel(p || parcels[0]); setSearchAttempted(true); }}>Khasra 142/1A (Nagpur)</button>
          </div>
        </form>
      </div>

      {/* Main Container */}
      <div className="public-portal-grid">
        {/* Left Column: Search Result & Timeline */}
        <div className="search-result-column">
          {searchedParcel ? (
            <div className="public-result-card">
              <div className="result-header">
                <div>
                  <div className="result-tag">Verified Land Parcel Entry</div>
                  <h2 className="result-khasra">Khasra No. {searchedParcel.khasraNo}</h2>
                  <div className="result-loc">{searchedParcel.village}, {searchedParcel.district}, {searchedParcel.state}</div>
                </div>

                <div className={`status-pill pill-${searchedParcel.stage === 'Disbursement' ? 'green' : 'blue'}`}>
                  {searchedParcel.stage === 'Disbursement' ? 'Compensation Disbursed (DBT Completed)' : `Active Stage: ${searchedParcel.stage}`}
                </div>
              </div>

              {/* Public Timeline */}
              <div className="public-timeline-section">
                <h3 className="section-heading">Legal Stage Status Timeline (Section 4 → Section 11 → Section 19 → Payout)</h3>

                <div className="stage-steps-grid">
                  {/* Step 1: Sec 4 */}
                  <div className={`stage-step-card ${searchedParcel.stageCode >= 1 ? 'completed' : ''}`}>
                    <div className="step-num">1</div>
                    <div className="step-info">
                      <div className="step-name">Section 4</div>
                      <div className="step-sub">Gazette Notification</div>
                    </div>
                  </div>

                  {/* Step 2: Sec 11 */}
                  <div className={`stage-step-card ${searchedParcel.stageCode >= 2 ? 'completed' : ''}`}>
                    <div className="step-num">2</div>
                    <div className="step-info">
                      <div className="step-name">Section 11</div>
                      <div className="step-sub">SIA Hearing</div>
                    </div>
                  </div>

                  {/* Step 3: Sec 19 */}
                  <div className={`stage-step-card ${searchedParcel.stageCode >= 3 ? 'completed' : ''}`}>
                    <div className="step-num">3</div>
                    <div className="step-info">
                      <div className="step-name">Section 19</div>
                      <div className="step-sub">Final Declaration</div>
                    </div>
                  </div>

                  {/* Step 4: Disbursement */}
                  <div className={`stage-step-card ${searchedParcel.stageCode >= 4 ? 'completed' : ''}`}>
                    <div className="step-num">4</div>
                    <div className="step-info">
                      <div className="step-name">Disbursement</div>
                      <div className="step-sub">DBT Direct Transfer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transparent Compensation Summary */}
              <div className="public-comp-card">
                <div className="comp-header">
                  <Award className="comp-icon" />
                  <div>
                    <div className="comp-lbl">Determined Compensation Award (Section 30 RFCTLARR)</div>
                    <div className="comp-val">₹{searchedParcel.compensationTotal.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div className="comp-grid">
                  <div className="comp-box">
                    <span>Landowner Name:</span>
                    <strong>{searchedParcel.ownerName}</strong>
                  </div>
                  <div className="comp-box">
                    <span>Acquired Area:</span>
                    <strong>{searchedParcel.areaAcquired} ({searchedParcel.landType})</strong>
                  </div>
                  <div className="comp-box">
                    <span>DBT Payment Status:</span>
                    <strong className={searchedParcel.disbursedAmount > 0 ? 'green-text' : 'amber-text'}>
                      {searchedParcel.disbursedAmount > 0
                        ? `Paid Out ₹${searchedParcel.disbursedAmount.toLocaleString('en-IN')}`
                        : 'Awaiting Final Treasury Payout'}
                    </strong>
                  </div>
                  <div className="comp-box">
                    <span>Infrastructure Project:</span>
                    <strong>{searchedParcel.project}</strong>
                  </div>
                </div>
              </div>

              {/* SMS Notification Subscription Widget */}
              <div className="sms-widget-card">
                <div className="widget-header">
                  <BellRing className="widget-icon" />
                  <div>
                    <div className="widget-title">Subscribe to Instant SMS & WhatsApp Stage Notifications</div>
                    <div className="widget-desc">Get automatic mobile SMS updates whenever legal hearing notices or compensation payouts are issued.</div>
                  </div>
                </div>

                {smsSubscribed ? (
                  <div className="sms-success-msg">
                    <Check className="check-icon" /> Mobile <strong>+91 {mobileNo}</strong> successfully registered for SMS alerts on Khasra {searchedParcel.khasraNo}!
                  </div>
                ) : (
                  <form onSubmit={handleSmsSubmit} className="sms-form">
                    <input
                      type="tel"
                      placeholder="Enter 10-digit Mobile Number"
                      value={mobileNo}
                      onChange={e => setMobileNo(e.target.value)}
                      required
                    />
                    <button type="submit" className="sms-sub-btn">
                      Enable SMS Updates
                    </button>
                  </form>
                )}
              </div>
            </div>
          ) : searchAttempted ? (
            <div className="public-empty-card">
              <Search className="empty-icon" />
              <h3>No matching land record found</h3>
              <p>Please check the Khasra Number or Landowner Name and try searching again.</p>
            </div>
          ) : (
            <div className="public-welcome-card">
              <Building className="welcome-icon" />
              <h2>Welcome to the Public Land Acquisition Portal</h2>
              <p>Use the search bar above to look up your land parcel acquisition status, verified survey records, or estimate your compensation award below.</p>
            </div>
          )}
        </div>

        {/* Right Column: Public Compensation Calculator */}
        <div className="calculator-column">
          <div className="calculator-card">
            <h3 className="calc-card-title"><Calculator className="sec-icon" /> Compensation Award Estimator (RFCTLARR 2013)</h3>
            <p className="calc-card-sub">Estimate your total compensation payout based on land area, circle rate, multiplier, and 100% statutory solatium.</p>

            <div className="calc-inputs">
              <div className="input-group">
                <label>Acquired Land Area (Hectares):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="50"
                  value={calcArea}
                  onChange={e => setCalcArea(Number(e.target.value))}
                />
              </div>

              <div className="input-group">
                <label>State Circle Rate (₹ per Hectare):</label>
                <input
                  type="number"
                  step="50000"
                  min="100000"
                  value={calcCircleRate}
                  onChange={e => setCalcCircleRate(Number(e.target.value))}
                />
              </div>

              <div className="input-group">
                <label>Land Classification & Multiplier Factor:</label>
                <select value={calcLandType} onChange={e => setCalcLandType(e.target.value)}>
                  <option value="RURAL_IRRIGATED">Rural Irrigated Land (2.0x Multiplier)</option>
                  <option value="RURAL_NON_IRRIGATED">Rural Non-Irrigated Land (1.5x Multiplier)</option>
                  <option value="URBAN_COMMERCIAL">Urban / Commercial Boundary (1.25x Multiplier)</option>
                </select>
              </div>
            </div>

            <div className="calc-breakdown-box">
              <div className="b-row">
                <span>Base Market Value (Area × Circle Rate × {multiplier}x):</span>
                <strong>₹{baseValue.toLocaleString('en-IN')}</strong>
              </div>
              <div className="b-row">
                <span>100% Solatium Bonus (Section 30):</span>
                <strong>₹{solatium.toLocaleString('en-IN')}</strong>
              </div>
              <div className="b-row">
                <span>Estimated Interest Component (12% p.a.):</span>
                <strong>₹{interest.toLocaleString('en-IN')}</strong>
              </div>

              <div className="b-total-row">
                <span>Estimated Total Payout:</span>
                <strong className="gold-text">₹{totalEstCompensation.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="calc-disclaimer">
              * Note: Estimates are calculated strictly per Schedules I & II of RFCTLARR Act 2013. Final awards are declared under Section 19 by District SLAO.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
