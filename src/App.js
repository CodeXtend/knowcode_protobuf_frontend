import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Marketplace from './pages/marketplace';
import FarmerDetail from './pages/FarmerDetail';
import AILab from './pages/AILab';
import TopNavigation from './components/TopNavigation';
import Dashboard from './pages/DashboardPage';
import RoleSelection from './pages/RoleSelection';
import FarmerRegistration from './pages/FarmerRegistration';
import ResourcesPage from './pages/ResourcesPage';
import FarmerDashboard from './pages/FarmerDashboard';
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
            <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/farmer-registration' element={<FarmerRegistration/>} />
            {/* <Route path="/card" element={<FarmerProductCar />} /> */}
            <Route path="/learn" element={<ResourcesPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/ai-lab" element={<AILab />} />
            <Route path="/farmer/:id" element={<FarmerDetail />} />
            <Route path="/farmerDashboard" element={<FarmerDashboard />} />
          </Routes>
          </>
      </Router>
    </div>
  );
}

export default App;