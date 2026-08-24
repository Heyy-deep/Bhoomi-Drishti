import React, { useState } from 'react';
import { X, Award, CheckCircle, Cpu, ShieldCheck, Activity, Globe, ArrowRight, Zap } from 'lucide-react';

export default function HackathonPitchModal({ isOpen, onClose }) {
  const [activeSlide, setActiveSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: "Problem Statement & National Challenge",
      subtitle: "SIH 2026 Problem Statement ID: SIH26016 • Ministry of Rural Development",
      content: (
        <div className="pitch-slide-body">
          <div className="pitch-callout red">
            <h3>The Core Challenge</h3>
            <p>Land acquisition for mega infrastructure projects in India currently suffers from an average delay of <strong>3.4 years</strong> due to fragmented title records, manual SLA monitoring, unhandled litigation stays, and zero transparency for affected landowners.</p>
          </div>

          <div className="pitch-grid-2">
            <div className="pitch-box">
              <h4>1. Revenue SLA Bottlenecks</h4>
              <p>Special Land Acquisition Officers (SLAO) lack automated tracking for Section 4, 11, and 19 statutory deadlines.</p>
            </div>
            <div className="pitch-box">
              <h4>2. Document Verification Gaps</h4>
              <p>Manual checks for 7/12 extracts, title deeds, and encumbrance certificates cause fraud risks and court disputes.</p>
            </div>
            <div className="pitch-box">
              <h4>3. Lack of Predictive Warning</h4>
              <p>Projects get stuck in litigation without early warning signals to district collectors or revenue legal cells.</p>
            </div>
            <div className="pitch-box">
              <h4>4. Opaque Public Payouts</h4>
              <p>Farmers and landowners face long queues, missing schedule information, and uncertainty about DBT compensation payouts.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "BhoomiDrishti — 4-Module Solution Architecture",
      subtitle: "Unified Digital Public Infrastructure (DPI) for End-to-End Land Governance",
      content: (
        <div className="pitch-slide-body">
          <div className="arch-flow-diagram">
            <div className="arch-card">
              <div className="arch-num">Mod 1</div>
              <h4>GIS Stage Tracker</h4>
              <p>Leaflet map layer visualizing parcel boundaries color-coded by legal stage (Sec 4 → 11 → 19 → Disbursement).</p>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-card">
              <div className="arch-num">Mod 2</div>
              <h4>Workflow SLA Engine</h4>
              <p>Statutory document auditor (7/12 & Title Deeds) with automated RFCTLARR 2013 SLA escalation rules.</p>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-card">
              <div className="arch-num">Mod 3</div>
              <h4>ML Delay Predictor</h4>
              <p>LightGBM risk inference engine flagging high-risk litigation & bottleneck delays with actionable recommendations.</p>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-card">
              <div className="arch-num">Mod 4</div>
              <h4>Public Claim Portal</h4>
              <p>Bilingual (EN/HI) status lookup, RFCTLARR compensation calculator, and SMS notification hooks.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Technology Stack & Key Differentiators",
      subtitle: "Modern, Scalable Web Stack & Machine Learning Engine",
      content: (
        <div className="pitch-slide-body">
          <div className="tech-stack-grid">
            <div className="tech-card">
              <Cpu className="tech-icon" />
              <h4>Frontend & Mapping Stack</h4>
              <p>React 19 + Vite + Leaflet.js GeoJSON Rendering + Vanilla CSS Glassmorphic Design System</p>
            </div>
            <div className="tech-card">
              <Activity className="tech-icon" />
              <h4>AI / ML Predictive Engine</h4>
              <p>LightGBM / XGBoost Model simulation evaluating 12+ risk features (days in stage, title disputes, officer workload)</p>
            </div>
            <div className="tech-card">
              <ShieldCheck className="tech-icon" />
              <h4>Automated Compliance Rules</h4>
              <p>Strict enforcement of RFCTLARR Act 2013 (Section 30 100% Solatium & 12% Interest calculation formulas)</p>
            </div>
            <div className="tech-card">
              <Globe className="tech-icon" />
              <h4>Bilingual & Public Access</h4>
              <p>i18n English/Hindi state management, Direct Benefit Transfer (DBT) status tracking, & Mobile SMS hooks</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Measurable Impact & Future Roadmap",
      subtitle: "Transforming Land Governance Across India",
      content: (
        <div className="pitch-slide-body">
          <div className="metrics-hero-grid">
            <div className="m-card">
              <div className="m-val">65%</div>
              <div className="m-lbl">Reduction in SLA Processing Delays</div>
            </div>
            <div className="m-card">
              <div className="m-val">100%</div>
              <div className="m-lbl">DBT Payout Transparency</div>
            </div>
            <div className="m-card">
              <div className="m-val">94.2%</div>
              <div className="m-lbl">ML Delay Prediction Accuracy</div>
            </div>
            <div className="m-card">
              <div className="m-val">Zero</div>
              <div className="m-lbl">Unverified Title Deed Approvals</div>
            </div>
          </div>

          <div className="roadmap-box">
            <h4>Future Integration Roadmap:</h4>
            <ul>
              <li><strong>Phase 1:</strong> Integration with State e-Dharti & Mahabhulekh API portals.</li>
              <li><strong>Phase 2:</strong> Drone survey imagery CAD boundary overlay & ULPIN (Unique Land Parcel Identification Number) integration.</li>
              <li><strong>Phase 3:</strong> Smart Contract Blockchain verification for land compensation escrow.</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="pitch-modal-overlay">
      <div className="pitch-modal-container">
        {/* Modal Header */}
        <div className="pitch-modal-header">
          <div className="header-left">
            <Award className="pitch-logo-icon" />
            <div>
              <h2 className="modal-title">BhoomiDrishti — Hackathon Pitch Deck</h2>
              <div className="modal-sub">Smart India Hackathon (SIH 2026) • Problem Statement SIH26016</div>
            </div>
          </div>

          <button className="close-modal-btn" onClick={onClose}>
            <X className="close-icon" />
          </button>
        </div>

        {/* Modal Slide Navigation */}
        <div className="pitch-slide-tabs">
          {slides.map((s, idx) => (
            <button
              key={idx}
              className={`slide-tab-btn ${activeSlide === idx ? 'active' : ''}`}
              onClick={() => setActiveSlide(idx)}
            >
              Slide {idx + 1}: {s.title.split('—')[0]}
            </button>
          ))}
        </div>

        {/* Slide Content */}
        <div className="pitch-slide-viewport">
          <div className="slide-title-banner">
            <h3>{slides[activeSlide].title}</h3>
            <p>{slides[activeSlide].subtitle}</p>
          </div>

          {slides[activeSlide].content}
        </div>

        {/* Modal Footer Controls */}
        <div className="pitch-modal-footer">
          <div className="slide-counter">Slide {activeSlide + 1} of {slides.length}</div>
          <div className="footer-btns">
            <button
              className="nav-slide-btn"
              disabled={activeSlide === 0}
              onClick={() => setActiveSlide(prev => prev - 1)}
            >
              ← Previous
            </button>
            <button
              className="nav-slide-btn primary"
              disabled={activeSlide === slides.length - 1}
              onClick={() => setActiveSlide(prev => prev + 1)}
            >
              Next Slide →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
