import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignupPage.css';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // store the registration data in sessionStorage for later use
            sessionStorage.setItem('registrationData', JSON.stringify({ email, username, password }));

            // Generate OTP
            await axios.post('http://localhost:5000/otp/generate_otp', { email });

            navigate('/otp-verification', { state: { email } });
        } catch (err) {
            console.error('Error generating OTP:', err);
            alert(err.response?.data?.message || 'Failed to send verification code');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <title>Signup Page</title>
            <div className="main-container">
                <header>
                    Create a new account.
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="SignupForm">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="ProceedButton">
                        <button type="submit">
                            Proceed
                        </button>
                    </div>
                </form>
                <div className="login-section">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </>
    );
}

export default SignupPage;