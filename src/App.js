import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing_sec1 from './components/landing_sec1';
import Dashboard from './pages/dashboard';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
        </Routes>
      </Router>
      </div>
  )};
export default App;
