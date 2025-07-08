import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import SteamIdPage from './pages/SteamIdPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Router>
      <div className="background">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<SteamIdPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
