import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing_sec1 from './components/landing_sec1';
import FarmerProductCard from './pages/card';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<FarmerProductCard />} />
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
