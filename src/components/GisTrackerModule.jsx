import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker } from 'react-leaflet';
import { STAGE_CONFIG } from '../data/parcelsData';
import { MapPin, Filter, AlertTriangle, CheckCircle, Clock, Shield, Search, ArrowRight, UserCheck, FileCheck } from 'lucide-react';
import L from 'leaflet';

// Fix default Leaflet icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function GisTrackerModule({ parcels, selectedParcel, setSelectedParcel, language }) {
  const [stateFilter, setStateFilter] = useState('ALL');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically derive unique states and districts from parcels data
  const availableStates = Array.from(new Set(parcels.map(p => p.state).filter(Boolean)));
  const availableDistricts = Array.from(
    new Set(
      parcels
        .filter(p => stateFilter === 'ALL' || p.state === stateFilter)
        .map(p => p.district)
        .filter(Boolean)
    )
  );

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setStateFilter(newState);
    setDistrictFilter('ALL'); // Reset district filter when state changes
  };

  // Filter logic
  const filteredParcels = parcels.filter(parcel => {
    if (stateFilter !== 'ALL' && parcel.state !== stateFilter) return false;
    if (districtFilter !== 'ALL' && parcel.district !== districtFilter) return false;
    if (stageFilter !== 'ALL' && parcel.stage !== stageFilter) return false;
    if (riskFilter !== 'ALL' && parcel.riskLevel !== riskFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        parcel.khasraNo.toLowerCase().includes(q) ||
        parcel.ownerName.toLowerCase().includes(q) ||
        parcel.id.toLowerCase().includes(q) ||
        parcel.village.toLowerCase().includes(q) ||
        parcel.district.toLowerCase().includes(q) ||
        parcel.state.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Auto-select single matching parcel for seamless UX when search/filter isolates one parcel
  React.useEffect(() => {
    if (filteredParcels.length === 1 && selectedParcel?.id !== filteredParcels[0].id) {
      setSelectedParcel(filteredParcels[0]);
    }
  }, [filteredParcels, selectedParcel, setSelectedParcel]);

  // Calculate center of map based on selected parcel or first filtered parcel or default India center
  const mapCenter = selectedParcel
    ? selectedParcel.coordinates
    : filteredParcels.length > 0
    ? filteredParcels[0].coordinates
    : [20.5937, 78.9629];
  const mapZoom = selectedParcel ? 12 : stateFilter !== 'ALL' ? 9 : 6;

  const totalDistrictsCount = Array.from(new Set(parcels.map(p => p.district))).length;

  return (
    <div className="module-layout">
      {/* Top Stage Statistics Bar */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => { setStageFilter('ALL'); setStateFilter('ALL'); setDistrictFilter('ALL'); }}>
          <div className="stat-label">{language === 'HI' ? 'कुल भूमि खसरा (Parcels)' : 'Total Parcels'}</div>
          <div className="stat-val">{parcels.length}</div>
          <div className="stat-sub">{language === 'HI' ? `${availableStates.length} राज्य एवं ${totalDistrictsCount} ज़िले` : `Across ${availableStates.length} States & ${totalDistrictsCount} Districts`}</div>
        </div>

        <div className={`stat-card border-amber ${stageFilter === 'Section 4' ? 'active' : ''}`} onClick={() => setStageFilter('Section 4')}>
          <div className="stat-label">Section 4 (Notification)</div>
          <div className="stat-val amber-text">{parcels.filter(p => p.stage === 'Section 4').length}</div>
          <div className="stat-sub">Public Objections Phase</div>
        </div>

        <div className={`stat-card border-blue ${stageFilter === 'Section 11' ? 'active' : ''}`} onClick={() => setStageFilter('Section 11')}>
          <div className="stat-label">Section 11 (Survey & Hearing)</div>
          <div className="stat-val blue-text">{parcels.filter(p => p.stage === 'Section 11').length}</div>
          <div className="stat-sub">SIA Hearing in progress</div>
        </div>

        <div className={`stat-card border-purple ${stageFilter === 'Section 19' ? 'active' : ''}`} onClick={() => setStageFilter('Section 19')}>
          <div className="stat-label">Section 19 (Declaration)</div>
          <div className="stat-val purple-text">{parcels.filter(p => p.stage === 'Section 19').length}</div>
          <div className="stat-sub">Award Determination</div>
        </div>

        <div className={`stat-card border-green ${stageFilter === 'Disbursement' ? 'active' : ''}`} onClick={() => setStageFilter('Disbursement')}>
          <div className="stat-label">Disbursement</div>
          <div className="stat-val green-text">{parcels.filter(p => p.stage === 'Disbursement').length}</div>
          <div className="stat-sub">DBT Direct Transfer</div>
        </div>
      </div>

      {/* Main Content Split: Filter & Map | Detail Panel */}
      <div className="gis-main-content">
        {/* Left Side: Map & Filter Controls */}
        <div className="map-column">
          {/* Toolbar & Filters */}
          <div className="filter-toolbar">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder={language === 'HI' ? 'खसरा संख्या, राज्य, ज़िला या नाम खोजें...' : 'Search Khasra No, State, District, Owner...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <Filter className="filter-icon" />
              {/* State Filter Dropdown (First) */}
              <select value={stateFilter} onChange={handleStateChange} title="Filter by State">
                <option value="ALL">{language === 'HI' ? 'सभी राज्य (All States)' : 'All States'}</option>
                {availableStates.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>

              {/* District Filter Dropdown (Second - Cascading) */}
              <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)} title="Filter by District">
                <option value="ALL">{language === 'HI' ? 'सभी ज़िले (All Districts)' : 'All Districts'}</option>
                {availableDistricts.map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>

              {/* Risk Level Filter Dropdown (Third) */}
              <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} title="Filter by Risk Level">
                <option value="ALL">{language === 'HI' ? 'सभी जोखिम स्तर (All Risk Levels)' : 'All Risk Levels'}</option>
                <option value="CRITICAL">Critical Risk (≥70%)</option>
                <option value="MEDIUM">Medium Risk</option>
                <option value="LOW">Low Risk</option>
              </select>
            </div>
          </div>

          {/* Leaflet Map Canvas */}
          <div className="map-container-wrapper">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%', borderRadius: '12px' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {filteredParcels.map(parcel => {
                const config = STAGE_CONFIG[parcel.stage] || {};
                const isSelected = selectedParcel && selectedParcel.id === parcel.id;

                return (
                  <React.Fragment key={parcel.id}>
                    <Polygon
                      positions={parcel.polygon}
                      pathOptions={{
                        color: isSelected ? '#ffffff' : config.color,
                        fillColor: config.color,
                        fillOpacity: isSelected ? 0.85 : 0.55,
                        weight: isSelected ? 4 : 2,
                        dashArray: parcel.slaStatus === 'BREACHED' ? '6, 6' : null
                      }}
                      eventHandlers={{
                        click: () => setSelectedParcel(parcel)
                      }}
                    >
                      <Popup>
                        <div className="map-popup-card">
                          <div className="popup-title">{parcel.khasraNo} ({parcel.village})</div>
                          <div className="popup-stage" style={{ color: config.color }}>{parcel.stage}</div>
                          <div className="popup-detail">Owner: <strong>{parcel.ownerName}</strong></div>
                          <div className="popup-detail">Area: <strong>{parcel.areaAcquired}</strong></div>
                          <div className="popup-detail">Compensation: <strong>₹{parcel.compensationTotal.toLocaleString('en-IN')}</strong></div>
                          <button
                            className="popup-btn"
                            onClick={() => setSelectedParcel(parcel)}
                          >
                            View Full Details →
                          </button>
                        </div>
                      </Popup>
                    </Polygon>

                    <Marker
                      position={parcel.coordinates}
                      eventHandlers={{ click: () => setSelectedParcel(parcel) }}
                    />
                  </React.Fragment>
                );
              })}
            </MapContainer>
          </div>

          {/* Legend Bar */}
          <div className="map-legend-bar">
            <div className="legend-title">Legend:</div>
            <div className="legend-item"><span className="legend-dot bg-amber"></span> Section 4 (Notification)</div>
            <div className="legend-item"><span className="legend-dot bg-blue"></span> Section 11 (Survey/Hearing)</div>
            <div className="legend-item"><span className="legend-dot bg-purple"></span> Section 19 (Declaration)</div>
            <div className="legend-item"><span className="legend-dot bg-green"></span> Disbursement</div>
            <div className="legend-item"><span className="legend-dashed"></span> SLA Breached</div>
          </div>
        </div>

        {/* Right Side: Detailed Parcel Drawer / Inspector */}
        <div className="detail-column">
          {selectedParcel ? (
            <div className="detail-panel">
              {/* Header */}
              <div className="panel-header">
                <div>
                  <span className="parcel-badge">{selectedParcel.id}</span>
                  <h3 className="parcel-khasra">Khasra No. {selectedParcel.khasraNo}</h3>
                  <div className="parcel-loc"><MapPin className="inline-icon" /> {selectedParcel.village}, {selectedParcel.district}, {selectedParcel.state}</div>
                </div>
                <div className={`sla-badge sla-${selectedParcel.slaStatus.toLowerCase()}`}>
                  {selectedParcel.slaStatus === 'BREACHED' && <AlertTriangle className="badge-icon" />}
                  {selectedParcel.slaStatus === 'WARNING' && <Clock className="badge-icon" />}
                  {selectedParcel.slaStatus === 'HEALTHY' && <CheckCircle className="badge-icon" />}
                  {selectedParcel.slaStatus} SLA
                </div>
              </div>

              {/* Legal Stage Progress Tracker */}
              <div className="stage-tracker-card">
                <div className="tracker-header">
                  <div className="stage-name">{STAGE_CONFIG[selectedParcel.stage]?.title}</div>
                  <div className="stage-pct">{selectedParcel.stageProgress}% Complete</div>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${selectedParcel.stageProgress}%`,
                      backgroundColor: STAGE_CONFIG[selectedParcel.stage]?.color
                    }}
                  ></div>
                </div>
                <div className="stage-sub-text">
                  {STAGE_CONFIG[selectedParcel.stage]?.description}
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="info-grid">
                <div className="info-box">
                  <div className="info-lbl">Landowner</div>
                  <div className="info-val">{selectedParcel.ownerName}</div>
                  <div className="info-sub">{selectedParcel.ownerContact}</div>
                </div>

                <div className="info-box">
                  <div className="info-lbl">Area & Type</div>
                  <div className="info-val">{selectedParcel.areaAcquired}</div>
                  <div className="info-sub">{selectedParcel.landType}</div>
                </div>

                <div className="info-box">
                  <div className="info-lbl">Total Award Value</div>
                  <div className="info-val gold-text">₹{selectedParcel.compensationTotal.toLocaleString('en-IN')}</div>
                  <div className="info-sub">
                    {selectedParcel.disbursedAmount > 0
                      ? `Disbursed: ₹${selectedParcel.disbursedAmount.toLocaleString('en-IN')}`
                      : 'Disbursement Pending'}
                  </div>
                </div>

                <div className="info-box">
                  <div className="info-lbl">Assigned SLAO</div>
                  <div className="info-val">{selectedParcel.assignedOfficer}</div>
                  <div className="info-sub">Days in Stage: {selectedParcel.daysInStage} / {selectedParcel.slaDeadlineDays} SLA</div>
                </div>
              </div>

              {/* Risk & Bottleneck Analysis Card */}
              <div className={`risk-analysis-card risk-card-${selectedParcel.riskLevel.toLowerCase()}`}>
                <div className="card-header-flex">
                  <div className="card-title">
                    <Shield className="title-icon" /> ML Delay Risk Score
                  </div>
                  <div className={`risk-score-pill pill-${selectedParcel.riskLevel.toLowerCase()}`}>
                    {selectedParcel.riskScore}% {selectedParcel.riskLevel} RISK
                  </div>
                </div>

                {selectedParcel.riskFactors && selectedParcel.riskFactors.length > 0 ? (
                  <ul className="risk-factors-list">
                    {selectedParcel.riskFactors.map((factor, idx) => (
                      <li key={idx}><AlertTriangle className="factor-icon" /> {factor}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="risk-clean-msg"><CheckCircle className="factor-icon green" /> Zero bottleneck risks detected. Stage on schedule.</div>
                )}
              </div>

              {/* Document Clearance Checklist */}
              <div className="doc-checklist-card">
                <div className="card-title"><FileCheck className="title-icon" /> Mandatory Verification Documents</div>
                <div className="doc-grid">
                  <div className="doc-item">
                    <span>Title Deed (Sale/Mutation)</span>
                    <span className={`doc-tag doc-${selectedParcel.documents.titleDeed.toLowerCase()}`}>{selectedParcel.documents.titleDeed}</span>
                  </div>
                  <div className="doc-item">
                    <span>7/12 & Khasra Extract</span>
                    <span className={`doc-tag doc-${selectedParcel.documents.sevenTwelveExtract.toLowerCase()}`}>{selectedParcel.documents.sevenTwelveExtract}</span>
                  </div>
                  <div className="doc-item">
                    <span>Encumbrance Certificate</span>
                    <span className={`doc-tag doc-${selectedParcel.documents.encumbranceCert.toLowerCase()}`}>{selectedParcel.documents.encumbranceCert}</span>
                  </div>
                  <div className="doc-item">
                    <span>Landowner Bank DBT Verification</span>
                    <span className={`doc-tag doc-${selectedParcel.documents.bankDetails.toLowerCase()}`}>{selectedParcel.documents.bankDetails}</span>
                  </div>
                </div>
              </div>

              {/* Historical Timeline */}
              <div className="timeline-card">
                <div className="card-title"><Clock className="title-icon" /> Audit & Stage Timeline</div>
                <div className="timeline-flow">
                  {selectedParcel.timeline.map((event, idx) => (
                    <div className="timeline-step" key={idx}>
                      <div className="timeline-bullet"></div>
                      <div className="timeline-content">
                        <div className="step-date">{event.date} • <span className="step-stage">{event.stage}</span></div>
                        <div className="step-note">{event.note}</div>
                        <div className="step-officer">Action Officer: {event.officer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-panel">
              <MapPin className="empty-icon" />
              <h3>Select a Land Parcel on the Map</h3>
              <p>Click on any polygon parcel or list entry to inspect legal stage progress, document compliance, and ML risk parameters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
