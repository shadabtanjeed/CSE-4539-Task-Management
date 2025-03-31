import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// page imports
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OtpVerificationPage from './pages/OtpVerificationPage';

import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp-verification" element={<OtpVerificationPage />} />
      </Routes>
    </Router>
  );
}

export default App;