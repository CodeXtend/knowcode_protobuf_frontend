import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import RoleSelection from './pages/RoleSelection';
import FarmerRegistration from './pages/FarmerRegistration';
import FarmerProductCard from "./pages/card.js";
import TopNavigation from "./components/TopNavigation.js";
import Dashboard from './pages/DashboardPage';
import ResourcesPage from './pages/ResourcesPage';

function App() {
  return (
    <div className="App">
      <Router>
        <>
          <TopNavigation />
          <Routes>
            <Route path="/">
              <Route path='/' element={<Landing/>} />
              <Route path='/dashboard' element={<Dashboard/>} />
              
            </Route>
            <Route path='/role-selection' element={<RoleSelection/>} />
          <Route path='/farmer-registration' element={<FarmerRegistration/>} />
            <Route path="/card" element={<FarmerProductCard />} />
            <Route path="/learn" element={<ResourcesPage />} />
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;