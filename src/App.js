import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import RoleSelection from './pages/RoleSelection';
import FarmerRegistration from './pages/FarmerRegistration';
import FarmerProductCard from "./components/card";
import TopNavigation from "./components/TopNavigation";
import Marketplace from "./pages/marketplace";
import Dashboard from './pages/dashboard';
function App() {
  return (
    <div className="App">
      <Router>
        <>
          <TopNavigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path='/role-selection' element={<RoleSelection/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/farmer-registration' element={<FarmerRegistration/>} />
            <Route path="/card" element={<FarmerProductCard />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;