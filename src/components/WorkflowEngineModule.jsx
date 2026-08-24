import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle, XCircle, Clock, AlertTriangle, ArrowRight, UserCheck, CheckSquare, RefreshCw, Send, Database, Lock, Hash, Link2, Check } from 'lucide-react';
import { API_INTEGRATIONS_STATUS } from '../data/parcelsData';

export default function WorkflowEngineModule({ parcels, setParcels, language }) {
  const [selectedParcelId, setSelectedParcelId] = useState(parcels[0]?.id || '');
  const [activeTab, setActiveTab] = useState('VERIFICATION'); // 'VERIFICATION' | 'SLA_QUEUE' | 'DOC_REPOSITORY'
  const [actionNotice, setActionNotice] = useState(null);

  const currentParcel = parcels.find(p => p.id === selectedParcelId) || parcels[0];

  // Handler to update document status for selected parcel
  const handleDocStatusChange = (docKey, newStatus) => {
    setParcels(prevParcels =>
      prevParcels.map(p => {
        if (p.id === currentParcel.id) {
          const updatedDocs = { ...p.documents, [docKey]: newStatus };
          const newTimeline = [
            ...p.timeline,
            {
              date: new Date().toISOString().split('T')[0],
              stage: p.stage,
              note: `Document [${docKey}] updated to ${newStatus} by Revenue Officer`,
              officer: p.assignedOfficer
            }
          ];
          return { ...p, documents: updatedDocs, timeline: newTimeline };
        }
        return p;
      })
    );

    setActionNotice(`Document state updated: ${docKey} → ${newStatus}`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Handler to advance legal stage
  const handleAdvanceStage = () => {
    let nextStage = currentParcel.stage;
    let nextCode = currentParcel.stageCode;
    let progress = 100;

    if (currentParcel.stage === 'Section 4') {
      nextStage = 'Section 11';
      nextCode = 2;
      progress = 40;
    } else if (currentParcel.stage === 'Section 11') {
      nextStage = 'Section 19';
      nextCode = 3;
      progress = 75;
    } else if (currentParcel.stage === 'Section 19') {
      nextStage = 'Disbursement';
      nextCode = 4;
      progress = 100;
    }

    setParcels(prevParcels =>
      prevParcels.map(p => {
        if (p.id === currentParcel.id) {
          const newTimeline = [
            ...p.timeline,
            {
              date: new Date().toISOString().split('T')[0],
              stage: nextStage,
              note: `Legal acquisition stage advanced from ${p.stage} to ${nextStage}`,
              officer: p.assignedOfficer
            }
          ];
          return {
            ...p,
            stage: nextStage,
            stageCode: nextCode,
            stageProgress: progress,
            daysInStage: 1,
            slaStatus: 'HEALTHY',
            timeline: newTimeline
          };
        }
        return p;
      })
    );

    setActionNotice(`Legal Acquisition Stage advanced to ${nextStage}!`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="module-layout">
      {/* Header Banner */}
      <div className="workflow-header-banner">
        <div>
          <h2 className="banner-title"><ShieldCheck className="banner-icon" /> Revenue Officer Workflow & SLA Control Engine</h2>
          <p className="banner-sub">RFCTLARR Act 2013 Automated Compliance, Document Verification, & Version-Controlled Repository</p>
        </div>

        <div className="tab-buttons-group">
          <button
            className={`tab-btn ${activeTab === 'VERIFICATION' ? 'active' : ''}`}
            onClick={() => setActiveTab('VERIFICATION')}
          >
            <FileText className="btn-icon" /> Document Verification Workspace
          </button>
          <button
            className={`tab-btn ${activeTab === 'DOC_REPOSITORY' ? 'active' : ''}`}
            onClick={() => setActiveTab('DOC_REPOSITORY')}
          >
            <Database className="btn-icon" /> Secure Document Repository & Audit
          </button>
          <button
            className={`tab-btn ${activeTab === 'SLA_QUEUE' ? 'active' : ''}`}
            onClick={() => setActiveTab('SLA_QUEUE')}
          >
            <Clock className="btn-icon" /> Officer SLA & Escalation Queue
          </button>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionNotice && (
        <div className="toast-notification">
          <CheckCircle className="toast-icon" /> {actionNotice}
        </div>
      )}

      {activeTab === 'VERIFICATION' ? (
        /* Workspace split */
        <div className="workflow-grid">
          {/* Left Column: Parcel Selector */}
          <div className="parcel-selector-card">
            <div className="card-header-sm">Select Parcel to Review</div>
            <div className="parcel-list-group">
              {parcels.map(parcel => (
                <div
                  key={parcel.id}
                  className={`parcel-item-card ${parcel.id === currentParcel.id ? 'active' : ''}`}
                  onClick={() => setSelectedParcelId(parcel.id)}
                >
                  <div className="item-top">
                    <span className="item-khasra">Khasra {parcel.khasraNo}</span>
                    <span className={`sla-pill pill-${parcel.slaStatus.toLowerCase()}`}>{parcel.slaStatus}</span>
                  </div>
                  <div className="item-owner">{parcel.ownerName} ({parcel.village})</div>
                  <div className="item-bottom">
                    <span className="item-stage">{parcel.stage}</span>
                    <span className="item-days">{parcel.daysInStage} days in stage</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Verification Workspace */}
          <div className="workspace-card">
            {/* Header info */}
            <div className="ws-header">
              <div>
                <div className="ws-id">{currentParcel.id} • Khasra {currentParcel.khasraNo}</div>
                <h3 className="ws-title">{currentParcel.ownerName} — {currentParcel.project}</h3>
                <div className="ws-sub">{currentParcel.village}, {currentParcel.district} | Area: {currentParcel.areaAcquired} | Type: {currentParcel.landType}</div>
              </div>

              <button className="advance-stage-btn" onClick={handleAdvanceStage}>
                Advance Legal Stage <ArrowRight className="btn-arrow" />
              </button>
            </div>

            {/* Statutory Document Inspection Table */}
            <div className="doc-verification-section">
              <h4 className="section-subtitle"><CheckSquare className="sec-icon" /> Statutory Document Verification Workbench</h4>

              <div className="doc-workbench-table">
                {/* Row 1: Title Deed */}
                <div className="doc-row">
                  <div className="doc-info">
                    <div className="doc-name">Title Deed (Sale Deed / Mutation Entry)</div>
                    <div className="doc-desc">Verifies ownership & land parcel boundary legal title under Revenue Code.</div>
                  </div>
                  <div className="doc-status-cell">
                    <span className={`doc-tag doc-${currentParcel.documents.titleDeed.toLowerCase()}`}>{currentParcel.documents.titleDeed}</span>
                  </div>
                  <div className="doc-actions">
                    <button className="act-btn approve" onClick={() => handleDocStatusChange('titleDeed', 'VERIFIED')}>Approve</button>
                    <button className="act-btn reject" onClick={() => handleDocStatusChange('titleDeed', 'REJECTED')}>Reject</button>
                    <button className="act-btn verify" onClick={() => handleDocStatusChange('titleDeed', 'IN_PROGRESS')}>Query e-SRO</button>
                  </div>
                </div>

                {/* Row 2: 7/12 Extract */}
                <div className="doc-row">
                  <div className="doc-info">
                    <div className="doc-name">7/12 Extract & Khasra Record (Rights Record)</div>
                    <div className="doc-desc">Authenticated land rights record from Mahabhulekh / State Land Record System.</div>
                  </div>
                  <div className="doc-status-cell">
                    <span className={`doc-tag doc-${currentParcel.documents.sevenTwelveExtract.toLowerCase()}`}>{currentParcel.documents.sevenTwelveExtract}</span>
                  </div>
                  <div className="doc-actions">
                    <button className="act-btn approve" onClick={() => handleDocStatusChange('sevenTwelveExtract', 'VERIFIED')}>Approve</button>
                    <button className="act-btn reject" onClick={() => handleDocStatusChange('sevenTwelveExtract', 'REJECTED')}>Reject</button>
                    <button className="act-btn verify" onClick={() => handleDocStatusChange('sevenTwelveExtract', 'IN_PROGRESS')}>Sync Mahabhulekh</button>
                  </div>
                </div>

                {/* Row 3: Encumbrance Certificate */}
                <div className="doc-row">
                  <div className="doc-info">
                    <div className="doc-name">Encumbrance Certificate (No-Dues Clearance)</div>
                    <div className="doc-desc">Ensures land is free from bank mortgages, legal liens, or court attachments.</div>
                  </div>
                  <div className="doc-status-cell">
                    <span className={`doc-tag doc-${currentParcel.documents.encumbranceCert.toLowerCase()}`}>{currentParcel.documents.encumbranceCert}</span>
                  </div>
                  <div className="doc-actions">
                    <button className="act-btn approve" onClick={() => handleDocStatusChange('encumbranceCert', 'VERIFIED')}>Approve</button>
                    <button className="act-btn reject" onClick={() => handleDocStatusChange('encumbranceCert', 'REJECTED')}>Reject</button>
                    <button className="act-btn verify" onClick={() => handleDocStatusChange('encumbranceCert', 'IN_PROGRESS')}>Fetch Sub-Registrar</button>
                  </div>
                </div>

                {/* Row 4: Bank Details */}
                <div className="doc-row">
                  <div className="doc-info">
                    <div className="doc-name">Landowner Bank Account (PFMS / DBT Validation)</div>
                    <div className="doc-desc">Verifies IFSC code, Aadhaar seeding, and bank account for direct award payout.</div>
                  </div>
                  <div className="doc-status-cell">
                    <span className={`doc-tag doc-${currentParcel.documents.bankDetails.toLowerCase()}`}>{currentParcel.documents.bankDetails}</span>
                  </div>
                  <div className="doc-actions">
                    <button className="act-btn approve" onClick={() => handleDocStatusChange('bankDetails', 'VERIFIED')}>Approve</button>
                    <button className="act-btn reject" onClick={() => handleDocStatusChange('bankDetails', 'REJECTED')}>Reject</button>
                    <button className="act-btn verify" onClick={() => handleDocStatusChange('bankDetails', 'IN_PROGRESS')}>Ping PFMS API</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Valuation & Compensation Payout Calculator */}
            <div className="payout-calc-card">
              <div className="calc-title">Award Valuation & Payout Summary (RFCTLARR Formula)</div>
              <div className="calc-row">
                <span>Base Market Value (Circle Rate × Multiplier Factor 2.0x):</span>
                <strong>₹{(currentParcel.compensationTotal * 0.5).toLocaleString('en-IN')}</strong>
              </div>
              <div className="calc-row">
                <span>100% Solatium (Mandatory 100% bonus under Section 30):</span>
                <strong>₹{(currentParcel.compensationTotal * 0.4).toLocaleString('en-IN')}</strong>
              </div>
              <div className="calc-row">
                <span>Additional Interest (12% per annum from Sec 4 notification):</span>
                <strong>₹{(currentParcel.compensationTotal * 0.1).toLocaleString('en-IN')}</strong>
              </div>
              <div className="calc-row total-row">
                <span>Net Compensation Payable to Landowner:</span>
                <strong className="gold-text">₹{currentParcel.compensationTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'DOC_REPOSITORY' ? (
        /* Secure Document Repository & Audit Trail View (Point 13) */
        <div className="sla-queue-view">
          <div className="queue-card">
            <h3 className="queue-title"><Lock className="sec-icon green" /> Secure Document Repository, Version Control & Audit Vault</h3>
            <p className="queue-desc">Cryptographically authenticated document store with SHA-256 hashes, e-Sign verification, and immutable audit logs for Parcel {currentParcel.id} (Khasra {currentParcel.khasraNo}).</p>

            <table className="sla-table" style={{ marginBottom: '24px' }}>
              <thead>
                <tr>
                  <th>Document File Name</th>
                  <th>Version</th>
                  <th>Cryptographic SHA-256 Hash</th>
                  <th>Upload Date</th>
                  <th>Uploader Role</th>
                  <th>e-Sign Status</th>
                </tr>
              </thead>
              <tbody>
                {currentParcel.docRepository && currentParcel.docRepository.map((doc, idx) => (
                  <tr key={idx}>
                    <td><strong><FileText className="icon-xs" /> {doc.name}</strong></td>
                    <td><span className="stage-pill">{doc.version}</span></td>
                    <td><code><Hash className="icon-xs" /> {doc.sha256}</code></td>
                    <td>{doc.date}</td>
                    <td>{doc.uploader}</td>
                    <td>
                      <span className={`doc-tag doc-${doc.eSign.toLowerCase()}`}>
                        {doc.eSign}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Audit History Log */}
            <h4 className="section-subtitle"><Clock className="sec-icon" /> Immutable System Audit History Trail</h4>
            <div className="timeline-flow" style={{ marginTop: '12px' }}>
              {currentParcel.timeline.map((event, idx) => (
                <div className="timeline-step" key={idx}>
                  <div className="timeline-bullet"></div>
                  <div className="timeline-content">
                    <div className="step-date">{event.date} • <span className="step-stage">{event.stage}</span></div>
                    <div className="step-note">{event.note}</div>
                    <div className="step-officer">Action By: <strong>{event.officer}</strong> (IP: 10.24.112.{40 + idx})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* SLA Monitoring Queue View */
        <div className="sla-queue-view">
          <div className="queue-card">
            <h3 className="queue-title"><Clock className="sec-icon" /> Revenue SLAO Performance & Escalation Dashboard</h3>
            <p className="queue-desc">Real-time tracking of SLA deadline compliance across Revenue Division Special Land Acquisition Officers (SLAO).</p>

            <table className="sla-table">
              <thead>
                <tr>
                  <th>Parcel ID</th>
                  <th>Khasra & Owner</th>
                  <th>Legal Stage</th>
                  <th>Assigned Officer</th>
                  <th>Days Spent</th>
                  <th>SLA Target</th>
                  <th>SLA Health</th>
                  <th>Escalation Action</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map(parcel => (
                  <tr key={parcel.id} className={parcel.slaStatus === 'BREACHED' ? 'row-breached' : ''}>
                    <td><strong>{parcel.id}</strong></td>
                    <td>
                      <div><strong>Khasra {parcel.khasraNo}</strong></div>
                      <div className="td-sub">{parcel.ownerName} ({parcel.district})</div>
                    </td>
                    <td><span className="stage-pill">{parcel.stage}</span></td>
                    <td>{parcel.assignedOfficer}</td>
                    <td><strong>{parcel.daysInStage} days</strong></td>
                    <td>{parcel.slaDeadlineDays} days</td>
                    <td>
                      <span className={`sla-pill pill-${parcel.slaStatus.toLowerCase()}`}>
                        {parcel.slaStatus}
                      </span>
                    </td>
                    <td>
                      {parcel.slaStatus === 'BREACHED' ? (
                        <button
                          className="escalate-btn"
                          onClick={() => {
                            setActionNotice(`Escalation Notice sent to District Collector for Parcel ${parcel.id}!`);
                            setTimeout(() => setActionNotice(null), 4000);
                          }}
                        >
                          <Send className="btn-icon-xs" /> Escalate to Collector
                        </button>
                      ) : (
                        <span className="no-action">Within SLA Limits</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
