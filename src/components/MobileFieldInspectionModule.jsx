import React, { useState } from 'react';
import { Smartphone, Camera, MapPin, CheckCircle, Shield, Upload, FileText, Send } from 'lucide-react';

export default function MobileFieldInspectionModule({ parcels, setParcels, language }) {
  const [selectedParcelId, setSelectedParcelId] = useState(parcels[0]?.id || '');
  const [gpsCaptured, setGpsCaptured] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [cropValuation, setCropValuation] = useState('450000');
  const [fieldNotes, setFieldNotes] = useState('Ground verification completed. Boundary stones verified against cadastral map.');
  const [syncedNotice, setSyncedNotice] = useState(null);

  const parcel = parcels.find(p => p.id === selectedParcelId) || parcels[0];

  const handleCaptureGps = () => {
    setGpsCaptured(true);
  };

  const handleCapturePhoto = () => {
    setPhotoCaptured(true);
  };

  const handleSubmitFieldReport = (e) => {
    e.preventDefault();
    setParcels(prev => prev.map(p => {
      if (p.id === parcel.id) {
        const newTimeline = [
          ...p.timeline,
          {
            date: new Date().toISOString().split('T')[0],
            stage: p.stage,
            note: `Field Geotagged Survey Verified (GPS: ${p.coordinates.join(', ')}). Crop Valuation: ₹${Number(cropValuation).toLocaleString('en-IN')}`,
            officer: "Field Revenue Inspector (Mobile)"
          }
        ];
        return { ...p, timeline: newTimeline };
      }
      return p;
    }));

    setSyncedNotice(`Field Inspection & GPS Geo-Tagging Report for Khasra ${parcel.khasraNo} synced to Central Database!`);
    setTimeout(() => setSyncedNotice(null), 4000);
  };

  return (
    <div className="module-layout" style={{ alignItems: 'center' }}>
      {/* Header Banner */}
      <div className="workflow-header-banner" style={{ width: '100%' }}>
        <div>
          <h2 className="banner-title"><Smartphone className="banner-icon" /> Mobile Field Data Collection & Geo-Tagging Tool</h2>
          <p className="banner-sub">Criteria 9 & 12 • Smartphone-responsive mobile interface for Revenue Officers on-site land inspection & geotagged evidence capture.</p>
        </div>
      </div>

      {/* Action Notification Alert */}
      {syncedNotice && (
        <div className="toast-notification" style={{ width: '100%' }}>
          <CheckCircle className="toast-icon" /> {syncedNotice}
        </div>
      )}

      {/* Mobile Frame Simulation Container */}
      <div className="mobile-frame-container">
        <div className="mobile-phone-shell">
          <div className="phone-notch"></div>

          {/* Mobile Screen Content */}
          <div className="phone-screen">
            <div className="phone-header">
              <span className="phone-app-title">BhoomiDrishti Field Inspector</span>
              <span className="phone-status-dot green"></span>
            </div>

            <div className="phone-body">
              <div className="input-group">
                <label className="phone-lbl">Select Land Parcel:</label>
                <select
                  value={selectedParcelId}
                  onChange={e => {
                    setSelectedParcelId(e.target.value);
                    setGpsCaptured(false);
                    setPhotoCaptured(false);
                  }}
                  className="phone-select"
                >
                  {parcels.map(p => (
                    <option key={p.id} value={p.id}>Khasra {p.khasraNo} — {p.ownerName} ({p.village})</option>
                  ))}
                </select>
              </div>

              <div className="phone-parcel-card">
                <div className="phone-p-title">Khasra No. {parcel.khasraNo}</div>
                <div className="phone-p-sub">{parcel.ownerName} • {parcel.areaAcquired}</div>
                <div className="phone-p-loc"><MapPin className="icon-xs" /> {parcel.village}, {parcel.district}</div>
              </div>

              {/* GPS Geotagging Trigger */}
              <div className="phone-action-box">
                <div className="phone-act-lbl">1. GPS Geo-Tagging (Spatial Coordinates)</div>
                {gpsCaptured ? (
                  <div className="phone-captured-badge green">
                    <CheckCircle className="icon-xs" /> GPS Coordinates Locked: {parcel.coordinates[0]}° N, {parcel.coordinates[1]}° E (Accuracy: ±1.2m)
                  </div>
                ) : (
                  <button type="button" className="phone-act-btn blue" onClick={handleCaptureGps}>
                    <MapPin className="icon-xs" /> Acquire Live Device GPS
                  </button>
                )}
              </div>

              {/* Geo-tagged Photo Capture Trigger */}
              <div className="phone-action-box">
                <div className="phone-act-lbl">2. Geotagged Site & Structure Photo</div>
                {photoCaptured ? (
                  <div className="phone-captured-badge green">
                    <CheckCircle className="icon-xs" /> Field Photo & EXIF Metadata Encrypted & Uploaded
                  </div>
                ) : (
                  <button type="button" className="phone-act-btn purple" onClick={handleCapturePhoto}>
                    <Camera className="icon-xs" /> Capture Geotagged Photo
                  </button>
                )}
              </div>

              {/* Standing Crop & Structure Valuation */}
              <form onSubmit={handleSubmitFieldReport} className="phone-form">
                <div className="input-group">
                  <label className="phone-lbl">Standing Crop / Structure Valuation (₹):</label>
                  <input
                    type="number"
                    value={cropValuation}
                    onChange={e => setCropValuation(e.target.value)}
                    className="phone-input"
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="phone-lbl">Inspection Notes & Boundary Observations:</label>
                  <textarea
                    value={fieldNotes}
                    onChange={e => setFieldNotes(e.target.value)}
                    className="phone-textarea"
                    rows="3"
                  ></textarea>
                </div>

                <button type="submit" className="phone-submit-btn">
                  <Send className="icon-xs" /> Sync Field Report to Server
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
