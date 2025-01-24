
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing_sec1 from './components/landing_sec1';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing_sec1/>} />
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
