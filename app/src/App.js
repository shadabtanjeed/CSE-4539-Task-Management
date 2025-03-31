import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// page imports
import LoginPage from './pages/LoginPage';

import './styles/global.css';

function App() {
  return (

    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </Router>
  );
}

export default App;