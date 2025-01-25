import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/landing';
import RoleSelection from './pages/RoleSelection';
import FarmerRegistration from './pages/FarmerRegistration';
import FarmerProductCard from "./components/card";
import TopNavigation from "./components/TopNavigation.js";
import Dashboard from './pages/DashboardPage';
import ResourcesPage from './pages/ResourcesPage';
import Marketplace from './pages/marketplace';
import FarmerDetail from './pages/FarmerDetail';
import AILab from './pages/AILab';
import Landing_sec1 from './components/landing_sec1';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Router>
        <>
          <TopNavigation />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Landing_sec1 />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/role-selection' element={<RoleSelection/>} />
              <Route path='/farmer-registration' element={<FarmerRegistration/>} />
              <Route path="/card" element={<FarmerProductCard />} />
              <Route path="/learn" element={<ResourcesPage />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/ai-lab" element={<AILab />} />
              <Route path="/farmer/:id" element={<FarmerDetail />} />
            </Routes>
          </AnimatePresence>
        </>
      </Router>
    </div>
  );
}

export default App;