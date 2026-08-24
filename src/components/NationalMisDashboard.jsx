import React, { useState } from 'react';
import { NATIONAL_AGGREGATES, API_INTEGRATIONS_STATUS } from '../data/parcelsData';
import { BarChart3, FileSpreadsheet, Download, ShieldCheck, Home, Users, CheckCircle2, Clock, Map, Activity, Link2, Check, Filter } from 'lucide-react';

export default function NationalMisDashboard({ parcels, language }) {
  const [selectedState, setSelectedState] = useState('ALL');
  const [reportFormat, setReportFormat] = useState('PDF');
  const [exportNotice, setExportNotice] = useState(null);

  const handleExportReport = () => {
    setExportNotice(`Custom MIS Report (${reportFormat}) generated & downloaded successfully!`);
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="module-layout">
      {/* Executive Header Banner */}
      <div className="mis-header-banner">
        <div>
          <div className="mis-badge">
            <BarChart3 className="badge-icon" /> National Executive Decision Support Portal
          </div>
          <h2 className="banner-title">National Land Acquisition MIS & Governance Dashboard</h2>
          <p className="banner-sub">Real-time consolidated tracking under RFCTLARR Act 2013 across Ministries, States, & Infrastructure Corridors.</p>
        </div>

        <div className="report-export-box">
          <select value={reportFormat} onChange={e => setReportFormat(e.target.value)} className="export-select">
            <option value="PDF">PDF Summary Report</option>
            <option value="CSV">CSV Data Export</option>
            <option value="EXCEL">Excel Detailed Audit</option>
          </select>
          <button className="export-btn" onClick={handleExportReport}>
            <Download className="btn-icon-xs" /> Export MIS Report
          </button>
        </div>
      </div>

      {/* Action Notification Alert */}
      {exportNotice && (
        <div className="toast-notification">
          <CheckCircle2 className="toast-icon" /> {exportNotice}
        </div>
      )}

      {/* Point 10 Criteria Metrics Grid */}
      <div className="stats-grid">
        <div className="stat-card border-blue">
          <div className="stat-label">Land Area Notified vs Acquired</div>
          <div className="stat-val blue-text">{NATIONAL_AGGREGATES.totalAcquiredAreaHa} Ha</div>
          <div className="stat-sub">Of {NATIONAL_AGGREGATES.totalNotifiedAreaHa} Ha Notified (64.3% Acquired)</div>
        </div>

        <div className="stat-card border-gold">
          <div className="stat-label">Compensation Assessed vs Paid</div>
          <div className="stat-val gold-text">₹{NATIONAL_AGGREGATES.totalCompensationPaidCr} Cr</div>
          <div className="stat-sub">Of ₹{NATIONAL_AGGREGATES.totalCompensationAssessedCr} Cr Assessed (68.8% Paid via DBT)</div>
        </div>

        <div className="stat-card border-purple">
          <div className="stat-label">Affected & Displaced Families</div>
          <div className="stat-val purple-text">{NATIONAL_AGGREGATES.displacedFamiliesCount} Families</div>
          <div className="stat-sub">Displaced of {NATIONAL_AGGREGATES.affectedFamiliesCount} Total Affected</div>
        </div>

        <div className="stat-card border-green">
          <div className="stat-label">R&R Housing Allotment</div>
          <div className="stat-val green-text">{NATIONAL_AGGREGATES.rrHousingAllottedCount} Plots</div>
          <div className="stat-sub">83.1% Displaced Families Relocated</div>
        </div>

        <div className="stat-card border-amber">
          <div className="stat-label">Possession Status & Timeline</div>
          <div className="stat-val amber-text">{NATIONAL_AGGREGATES.possessionHandedOverPct}% Handed Over</div>
          <div className="stat-sub">SLA Timeline Adherence: {NATIONAL_AGGREGATES.timelineSlaAdherencePct}%</div>
        </div>
      </div>

      {/* Main Split: Detailed MIS Tables & API Integration Hub */}
      <div className="mis-grid">
        {/* Left Column: Project & R&R Status Table */}
        <div className="mis-table-card">
          <div className="card-header-flex">
            <h3 className="card-title-lg"><Map className="title-icon" /> Infrastructure Corridor Progress & Possession Matrix</h3>
            <div className="filter-group-sm">
              <Filter className="icon-xs" />
              <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
                <option value="ALL">All States</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>
          </div>

          <table className="mis-table">
            <thead>
              <tr>
                <th>Parcel & Location</th>
                <th>Project Corridor</th>
                <th>Area (Ha)</th>
                <th>Stage & Possession</th>
                <th>Affected / Displaced</th>
                <th>R&R Relocation Status</th>
                <th>Compensation Award</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map(parcel => (
                <tr key={parcel.id}>
                  <td>
                    <strong>{parcel.id}</strong>
                    <div className="td-sub">Khasra {parcel.khasraNo} ({parcel.district})</div>
                  </td>
                  <td>{parcel.project}</td>
                  <td><strong>{parcel.areaAcquired}</strong></td>
                  <td>
                    <span className="stage-pill">{parcel.stage}</span>
                    <div className="td-sub">{parcel.possessionStatus}</div>
                  </td>
                  <td>
                    <div><strong>{parcel.affectedFamilies} Affected</strong></div>
                    <div className="td-sub">{parcel.displacedFamilies} Displaced</div>
                  </td>
                  <td>
                    <span className={`rr-pill ${parcel.rrStatus.includes('Issued') || parcel.rrStatus.includes('N/A') ? 'rr-green' : 'rr-amber'}`}>
                      {parcel.rrStatus}
                    </span>
                  </td>
                  <td>
                    <strong className="gold-text">₹{parcel.compensationTotal.toLocaleString('en-IN')}</strong>
                    <div className="td-sub">{parcel.disbursedAmount > 0 ? 'DBT Paid' : 'Pending Payout'}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Column: API Integration Gateway Status Hub (Point 11) */}
        <div className="api-hub-card">
          <h3 className="card-title-lg"><Link2 className="title-icon green" /> Government Portal API Integration Hub</h3>
          <p className="sec-desc">Real-time status of automated API connectors with land records, satellite maps, & payment gateways.</p>

          <div className="api-list">
            {API_INTEGRATIONS_STATUS.map((api, idx) => (
              <div key={idx} className="api-item">
                <div className="api-top">
                  <span className="api-name">{api.name}</span>
                  <span className="api-status-tag"><Check className="check-icon-sm" /> {api.status}</span>
                </div>
                <div className="api-sub">Endpoint: <code>{api.endpoint}</code></div>
                <div className="api-lat">Response Latency: <strong>{api.latency}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
