import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/OtpVerificationPage.css';

function OtpVerificationPage() {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        } else {
            alert('No email provided');
            navigate('/signup');
        }
    }, [location, navigate]);

    const handleVerify = async () => {
        if (!otp || otp.length !== 6) {
            alert('Please enter a valid 6-digit OTP');
            return;
        }

        setIsLoading(true);

        try {
            // Verify OTP
            await axios.post('http://localhost:5000/otp/verify_otp', { email, otp });

            // Get registration data from session storage
            const registrationData = JSON.parse(sessionStorage.getItem('registrationData'));

            if (!registrationData) {
                throw new Error('Registration data not found');
            }

            // Complete user registration
            await axios.post('http://localhost:5000/auth/add_user', registrationData);

            // Clear session storage
            sessionStorage.removeItem('registrationData');

            // Navigate to login page
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            console.error('Error during verification:', err);
            alert(err.response?.data?.message || 'Verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setIsLoading(true);

        try {
            await axios.post('http://localhost:5000/otp/generate_otp', { email });
            alert('A new OTP has been sent to your email');
        } catch (err) {
            console.error('Error resending OTP:', err);
            alert(err.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setIsLoading(false);
        }
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
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        required
                        maxLength="6"
                        disabled={isLoading}
                    />
                </div>
                <div className="VerifyButton">
                    <button onClick={handleVerify}>
                        Verify
                    </button>
                </div>
                <div className="register-section">
                    Didn't receive the OTP? <button className="resend-link" onClick={handleResend} disabled={isLoading}>Resend</button>
                </div>
            </div>
        </>
    );
}

export default OtpVerificationPage;