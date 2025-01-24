import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/landing';
import RoleSelection from './pages/RoleSelection';
import FarmerRegistration from './pages/FarmerRegistration';

import FarmerProductCard from "./pages/card";

import TopNavigation from "./components/TopNavigation";

function App() {

  return (
    <div className="App">
          <TopNavigation />
      <Router>
        <Routes>

            <Route path="/" element={<Landing />} />
            <Route path='/role-selection' element={<RoleSelection/>} />
            <Route path='/farmer-registration' element={<FarmerRegistration/>} />
            <Route path="/card" element={<FarmerProductCard />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
