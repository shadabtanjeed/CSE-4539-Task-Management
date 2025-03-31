import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/OtpVerificationPage.css';

function OtpVerificationPage() {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        }
    }, [location]);

    const handleVerify = () => {
        // Logic will be implemented later
        navigate('/login');
    };

    return (
        <div className="main-container">
            <header>
                Verify Your Email
            </header>
            <div className="verification-message">
                A six digit OTP has been sent to your email: <span className="email-highlight">{email}</span>
            </div>
            <div className="OtpForm">
                <input
                    type="text"
                    placeholder="Enter the OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength="6"
                />
            </div>
            <div className="VerifyButton">
                <button onClick={handleVerify}>Verify</button>
            </div>

        </div>
    );
}

export default OtpVerificationPage;