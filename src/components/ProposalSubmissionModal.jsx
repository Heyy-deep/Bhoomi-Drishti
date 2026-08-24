import React, { useState } from 'react';
import { X, Send, MapPin, FileUp, CheckCircle, Building } from 'lucide-react';
import { WEST_BENGAL_DISTRICTS } from '../data/parcelsData';

export default function ProposalSubmissionModal({ isOpen, onClose, onAddProposal }) {
  const [projectTitle, setProjectTitle] = useState('');
  const [agencyName, setAgencyName] = useState('NHAI (National Highways Authority of India)');
  const [selectedState, setSelectedState] = useState('West Bengal');
  const [district, setDistrict] = useState('Kolkata');
  const [areaHa, setAreaHa] = useState('5.40');
  const [khasraList, setKhasraList] = useState('112/1, 112/2, 114/A');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleStateChange = (e) => {
    const st = e.target.value;
    setSelectedState(st);
    if (st === 'West Bengal') setDistrict('Kolkata');
    else if (st === 'Maharashtra') setDistrict('Nagpur');
    else if (st === 'Gujarat') setDistrict('Ahmedabad');
    else if (st === 'Karnataka') setDistrict('Bengaluru Urban');
    else if (st === 'Uttar Pradesh') setDistrict('Gautam Buddha Nagar');
  };

  const getDistrictsForState = () => {
    if (selectedState === 'West Bengal') return WEST_BENGAL_DISTRICTS;
    if (selectedState === 'Maharashtra') return ['Nagpur', 'Pune', 'Thane', 'Mumbai City', 'Mumbai Suburban', 'Nashik', 'Chhatrapati Sambhajinagar'];
    if (selectedState === 'Gujarat') return ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'];
    if (selectedState === 'Karnataka') return ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Dakshina Kannada'];
    if (selectedState === 'Uttar Pradesh') return ['Gautam Buddha Nagar', 'Lucknow', 'Varanasi', 'Kanpur Nagar', 'Agra'];
    return ['Kolkata', 'Nagpur', 'Pune'];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParcel = {
      id: `LND-WB-2026-0${Math.floor(100 + Math.random() * 900)}`,
      khasraNo: khasraList.split(',')[0] || '112/1',
      ownerName: "Submitted Proposal (Under Scrutiny)",
      ownerContact: "+91 98000 00000",
      village: "Multi-Village Corridor",
      district,
      state: selectedState,
      project: projectTitle || "New Infrastructure Corridor Proposal",
      areaAcquired: `${areaHa} Ha`,
      landType: "Mixed Land (Agricultural/Commercial)",
      stage: "Section 4",
      stageCode: 1,
      stageProgress: 10,
      possessionStatus: "Proposal Submitted",
      affectedFamilies: 5,
      displacedFamilies: 1,
      rrStatus: "Initial SIA Scrutiny",
      coordinates: [21.1458, 79.0882],
      polygon: [
        [21.1480, 79.0860],
        [21.1495, 79.0890],
        [21.1455, 79.0905],
        [21.1445, 79.0870]
      ],
      compensationTotal: 15000000,
      disbursedAmount: 0,
      assignedOfficer: "Collector Scrutiny Cell",
      officerId: "OFF-SCRUTINY",
      slaStatus: "HEALTHY",
      daysInStage: 1,
      slaDeadlineDays: 30,
      riskScore: 15,
      riskLevel: "LOW",
      riskFactors: [],
      documents: {
        titleDeed: "IN_PROGRESS",
        sevenTwelveExtract: "IN_PROGRESS",
        encumbranceCert: "PENDING",
        bankDetails: "PENDING",
        socialImpactReport: "IN_PROGRESS"
      },
      docRepository: [
        { name: "Acquisition_Proposal_Gazette_Draft.pdf", version: "v1.0", sha256: "ab90123f...88a1", date: new Date().toISOString().split('T')[0], uploader: agencyName, eSign: "VERIFIED" }
      ],
      timeline: [
        { date: new Date().toISOString().split('T')[0], stage: "Proposal Submission", note: "Online Proposal submitted by acquiring agency", officer: agencyName }
      ]
    };

    onAddProposal(newParcel);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="pitch-modal-overlay">
      <div className="pitch-modal-container" style={{ maxWidth: '650px' }}>
        <div className="pitch-modal-header">
          <div className="header-left">
            <Building className="pitch-logo-icon" />
            <div>
              <h2 className="modal-title">Online Land Acquisition Proposal Submission</h2>
              <div className="modal-sub">Criteria 8 • Automated Departmental Proposal Portal</div>
            </div>
          </div>
          <button className="close-modal-btn" onClick={onClose}><X className="close-icon" /></button>
        </div>

        <div className="pitch-slide-viewport">
          {submitted ? (
            <div className="sms-success-msg" style={{ fontSize: '16px', padding: '40px 0', justifyContent: 'center' }}>
              <CheckCircle className="check-icon" /> Proposal Submitted Successfully! Dispatched to Collector Scrutiny Queue.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="calc-inputs" style={{ gap: '16px' }}>
              <div className="input-group">
                <label>Infrastructure Project Name:</label>
                <input
                  type="text"
                  placeholder="e.g. Samruddhi Mahamarg Feeder Expressway Phase IV"
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Acquiring Department / Agency:</label>
                <select value={agencyName} onChange={e => setAgencyName(e.target.value)}>
                  <option value="NHAI (National Highways Authority of India)">NHAI (National Highways Authority of India)</option>
                  <option value="Indian Railways (DFCCIL Zone)">Indian Railways (DFCCIL Zone)</option>
                  <option value="State PWD Infrastructure Division">State PWD Infrastructure Division</option>
                  <option value="Port Authority / Industrial Development Corp">Port Authority / MIDC</option>
                </select>
              </div>

              <div className="pitch-grid-2">
                <div className="input-group">
                  <label>State:</label>
                  <select value={selectedState} onChange={handleStateChange}>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>District:</label>
                  <select value={district} onChange={e => setDistrict(e.target.value)}>
                    {getDistrictsForState().map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>Khasra / Survey Numbers List (Comma Separated):</label>
                <input
                  type="text"
                  placeholder="e.g. 112/1, 112/2, 114/A"
                  value={khasraList}
                  onChange={e => setKhasraList(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Upload Draft Gazette Notification / Spatial GeoJSON File:</label>
                <div className="search-input-wrapper" style={{ cursor: 'pointer', padding: '12px' }}>
                  <FileUp className="public-search-icon" />
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Acquisition_Proposal_Draft_Gazette.pdf (Selected)</span>
                </div>
              </div>

              <button type="submit" className="advance-stage-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                <Send className="btn-icon" /> Submit Proposal for Collector Scrutiny
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
