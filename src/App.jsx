import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NationalMisDashboard from './components/NationalMisDashboard';
import GisTrackerModule from './components/GisTrackerModule';
import WorkflowEngineModule from './components/WorkflowEngineModule';
import DelayPredictorModule from './components/DelayPredictorModule';
import MobileFieldInspectionModule from './components/MobileFieldInspectionModule';
import PublicPortalModule from './components/PublicPortalModule';
import ProposalSubmissionModal from './components/ProposalSubmissionModal';
import AuthScreen from './components/AuthScreen';
import { INITIAL_PARCELS } from './data/parcelsData';
import './App.css';

export default function App() {
  const [parcels, setParcels] = useState(INITIAL_PARCELS);
  const [activeModule, setActiveModule] = useState('mis'); // 'mis' | 'gis' | 'workflow' | 'predictor' | 'mobile' | 'public'
  const [selectedParcel, setSelectedParcel] = useState(INITIAL_PARCELS[0]);
  const [language, setLanguage] = useState('EN'); // 'EN' | 'HI'
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bhoomidrishti_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleAddProposal = (newParcel) => {
    setParcels(prev => [newParcel, ...prev]);
    setSelectedParcel(newParcel);
    setActiveModule('gis');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bhoomidrishti_current_user');
  };

  if (!user) {
    return (
      <AuthScreen
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          localStorage.setItem('bhoomidrishti_current_user', JSON.stringify(loggedInUser));
        }}
      />
    );
  }

  return (
    <div className="bhoomidrishti-app">
      {/* Top Header Navigation */}
      <Navbar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        language={language}
        setLanguage={setLanguage}
        onOpenProposal={() => setIsProposalOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Module Viewport */}
      <main className="main-viewport">
        {activeModule === 'mis' && (
          <NationalMisDashboard
            parcels={parcels}
            language={language}
          />
        )}

        {activeModule === 'gis' && (
          <GisTrackerModule
            parcels={parcels}
            selectedParcel={selectedParcel}
            setSelectedParcel={setSelectedParcel}
            language={language}
          />
        )}

        {activeModule === 'workflow' && (
          <WorkflowEngineModule
            parcels={parcels}
            setParcels={setParcels}
            language={language}
          />
        )}

        {activeModule === 'predictor' && (
          <DelayPredictorModule
            parcels={parcels}
            language={language}
          />
        )}

        {activeModule === 'mobile' && (
          <MobileFieldInspectionModule
            parcels={parcels}
            setParcels={setParcels}
            language={language}
          />
        )}

        {activeModule === 'public' && (
          <PublicPortalModule
            parcels={parcels}
            language={language}
          />
        )}
      </main>

      {/* Online Proposal Submission Modal */}
      <ProposalSubmissionModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        onAddProposal={handleAddProposal}
      />
    </div>
  );
}
