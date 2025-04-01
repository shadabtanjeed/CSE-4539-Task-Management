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
            setLoading(false);
        } else {
            // If no email is found, redirect to signup page
            console.log("No email provided, redirecting to signup");
            navigate('/signup');
        }
    }, [location, navigate]);

    const handleVerify = () => {
        // Logic will be implemented later
        navigate('/login');
    };

    return (
        <>
            <title>OTP Verification</title>
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
        </>
    );
}

export default OtpVerificationPage;