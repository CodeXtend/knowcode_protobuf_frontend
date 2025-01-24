import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FarmerProductCard from './pages/card';
import Landing from './pages/landing';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/card' element={<FarmerProductCard />} />
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
