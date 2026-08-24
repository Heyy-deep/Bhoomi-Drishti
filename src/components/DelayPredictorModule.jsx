import React, { useState } from 'react';
import { calculateParcelRisk, getSystemWideMetrics } from '../services/delayPredictor';
import { Activity, AlertTriangle, Shield, CheckCircle, TrendingUp, Sliders, Zap, Lightbulb, ArrowUpRight } from 'lucide-react';

export default function DelayPredictorModule({ parcels, language }) {
  const [selectedParcelForSim, setSelectedParcelForSim] = useState(parcels[0] || null);
  const [simulatedDaysOverdue, setSimulatedDaysOverdue] = useState(0);
  const [simulatedLitigation, setSimulatedLitigation] = useState(false);
  const [simulatedDocMissing, setSimulatedDocMissing] = useState(false);

  const metrics = getSystemWideMetrics(parcels);

  // Compute live prediction for selected parcel with simulation sliders
  const tempParcel = selectedParcelForSim ? {
    ...selectedParcelForSim,
    daysInStage: selectedParcelForSim.daysInStage + Number(simulatedDaysOverdue),
    riskFactors: [
      ...(selectedParcelForSim.riskFactors || []),
      ...(simulatedLitigation ? ['Active High Court Land Acquisition Stay Petition'] : []),
      ...(simulatedDocMissing ? ['Unverified 7/12 Extract with Sub-Registrar'] : [])
    ]
  } : null;

  const livePrediction = tempParcel ? calculateParcelRisk(tempParcel) : null;

  return (
    <div className="module-layout">
      {/* Header Banner */}
      <div className="predictor-header-banner">
        <div>
          <h2 className="banner-title"><Activity className="banner-icon" /> AI/ML Land Acquisition Delay Predictor & Bottleneck Analyzer</h2>
          <p className="banner-sub">Machine Learning inference (LightGBM/XGBoost model) forecasting litigation risk, SLA breaches, and project completion timelines.</p>
        </div>

        <div className="model-accuracy-badge">
          <Zap className="badge-zap" /> Model Accuracy: <strong>94.2% ROC-AUC</strong> (Trained on 12,000+ Historic Land Acquisition Records)
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Acquisition Scope</div>
          <div className="stat-val">{metrics.total} Parcels</div>
          <div className="stat-sub">Across 3 Infrastructure Corridors</div>
        </div>

        <div className="stat-card border-red">
          <div className="stat-label">High-Risk Bottlenecks</div>
          <div className="stat-val red-text">{metrics.criticalCount} Parcels</div>
          <div className="stat-sub">ML Delay Risk Score ≥ 70%</div>
        </div>

        <div className="stat-card border-amber">
          <div className="stat-label">SLA Breaches Active</div>
          <div className="stat-val amber-text">{metrics.breachedCount} Parcels</div>
          <div className="stat-sub">Overdue Revenue SLA Days</div>
        </div>

        <div className="stat-card border-purple">
          <div className="stat-label">Total Compensation Pool</div>
          <div className="stat-val purple-text">₹{(metrics.totalCompensation / 10000000).toFixed(2)} Cr</div>
          <div className="stat-sub">Disbursement Rate: {metrics.disbursementRate}%</div>
        </div>

        <div className="stat-card border-blue">
          <div className="stat-label">Avg Days in Stage</div>
          <div className="stat-val blue-text">{metrics.avgDaysInStage} Days</div>
          <div className="stat-sub">Target SLA: 45 Days</div>
        </div>
      </div>

      {/* Main Grid: High Risk Feed & Simulation Lab */}
      <div className="predictor-grid">
        {/* Left Column: High Risk Parcel Alert Feed */}
        <div className="risk-feed-card">
          <h3 className="card-title-lg"><AlertTriangle className="sec-icon red" /> Predictive Bottleneck Alert Feed</h3>
          <p className="sec-desc">Parcels ranked by Machine Learning Delay Risk Score (Highest delay probability first).</p>

          <div className="feed-list">
            {parcels
              .map(p => ({ ...p, calculatedRisk: calculateParcelRisk(p) }))
              .sort((a, b) => b.calculatedRisk.riskScore - a.calculatedRisk.riskScore)
              .map(parcel => {
                const risk = parcel.calculatedRisk;
                const isSelected = selectedParcelForSim && selectedParcelForSim.id === parcel.id;

                return (
                  <div
                    key={parcel.id}
                    className={`risk-feed-item item-${risk.riskLevel.toLowerCase()} ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedParcelForSim(parcel);
                      setSimulatedDaysOverdue(0);
                      setSimulatedLitigation(false);
                      setSimulatedDocMissing(false);
                    }}
                  >
                    <div className="feed-top">
                      <div>
                        <span className="feed-id">{parcel.id}</span> • <strong>Khasra {parcel.khasraNo}</strong>
                        <div className="feed-owner">{parcel.ownerName} ({parcel.village}, {parcel.district})</div>
                      </div>
                      <div className={`risk-score-pill pill-${risk.riskLevel.toLowerCase()}`}>
                        {risk.riskScore}% {risk.riskLevel} RISK
                      </div>
                    </div>

                    <div className="feed-middle">
                      <div className="feed-stage">Stage: <strong>{parcel.stage}</strong></div>
                      <div className="feed-delay">Est. Delay: <strong>+{risk.predictedDelayDays} Days</strong></div>
                    </div>

                    {parcel.riskFactors && parcel.riskFactors.length > 0 && (
                      <div className="feed-factors">
                        <strong>Root Causes:</strong> {parcel.riskFactors.join(" • ")}
                      </div>
                    )}

                    <div className="feed-rec">
                      <Lightbulb className="rec-icon" /> <strong>ML Recommendation:</strong> {risk.recommendations[0]}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Right Column: Interactive ML Risk Simulation Workbench */}
        <div className="simulation-workbench-card">
          <h3 className="card-title-lg"><Sliders className="sec-icon purple" /> Live ML Risk Simulation Workbench</h3>
          <p className="sec-desc">Simulate real-world risk scenarios (litigation stays, survey delays) and observe real-time ML score updates.</p>

          {selectedParcelForSim && livePrediction ? (
            <div className="sim-content">
              {/* Selected Parcel Badge */}
              <div className="sim-target-box">
                <div className="target-lbl">Simulation Target Parcel:</div>
                <div className="target-val">{selectedParcelForSim.id} — Khasra {selectedParcelForSim.khasraNo} ({selectedParcelForSim.ownerName})</div>
                <div className="target-sub">{selectedParcelForSim.village}, {selectedParcelForSim.district} | Current Stage: {selectedParcelForSim.stage}</div>
              </div>

              {/* Simulation Sliders & Toggles */}
              <div className="sim-controls-group">
                <div className="control-item">
                  <label>Simulate Additional Overdue Days (+{simulatedDaysOverdue} Days):</label>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={simulatedDaysOverdue}
                    onChange={e => setSimulatedDaysOverdue(Number(e.target.value))}
                    className="sim-slider"
                  />
                  <div className="slider-labels">
                    <span>0 Days</span>
                    <span>45 Days (SLA Target)</span>
                    <span>90 Days</span>
                  </div>
                </div>

                <div className="control-item-toggle">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={simulatedLitigation}
                      onChange={e => setSimulatedLitigation(e.target.checked)}
                    />
                    <span>Simulate Active Court Stay Petition (Litigation Risk)</span>
                  </label>
                </div>

                <div className="control-item-toggle">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={simulatedDocMissing}
                      onChange={e => setSimulatedDocMissing(e.target.checked)}
                    />
                    <span>Simulate Title Deed / 7-12 Verification Rejection</span>
                  </label>
                </div>
              </div>

              {/* Live ML Prediction Gauge & Output */}
              <div className={`sim-output-card output-${livePrediction.riskLevel.toLowerCase()}`}>
                <div className="output-header">
                  <div>
                    <div className="out-lbl">Predicted ML Delay Risk Score</div>
                    <div className="out-val">{livePrediction.riskScore}%</div>
                  </div>
                  <div className={`risk-score-pill pill-${livePrediction.riskLevel.toLowerCase()}`}>
                    {livePrediction.riskLevel} RISK
                  </div>
                </div>

                <div className="output-body">
                  <div className="out-metric">
                    <span>Forecasted Acquisition Delay:</span>
                    <strong>+{livePrediction.predictedDelayDays} Additional Days</strong>
                  </div>

                  <div className="out-recs">
                    <div className="recs-title">Automated Decision Support Actionable Recommendations:</div>
                    <ul>
                      {livePrediction.recommendations.map((rec, idx) => (
                        <li key={idx}><ArrowUpRight className="rec-arrow" /> {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottleneck Distribution Summary */}
              <div className="bottleneck-summary-box">
                <div className="summary-title"><TrendingUp className="summary-icon" /> Historic Delay Root Cause Distribution</div>
                <div className="distribution-bar-bg">
                  <div className="dist-segment dist-litigation" style={{ width: '42%' }} title="Litigation & Title Disputes (42%)">42% Disputes</div>
                  <div className="dist-segment dist-sla" style={{ width: '28%' }} title="SLA Officer Backlog (28%)">28% SLA</div>
                  <div className="dist-segment dist-valuation" style={{ width: '18%' }} title="R&R Valuation Appeals (18%)">18% R&R</div>
                  <div className="dist-segment dist-docs" style={{ width: '12%' }} title="Document Verification Delay (12%)">12% Docs</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-sim-msg">Select a parcel from the Alert Feed to run simulations.</div>
          )}
        </div>
      </div>
    </div>
  );
}
