import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupPage.css';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();


        navigate('/otp-verification', { state: { email } });
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
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="ProceedButton">
                        <button type="submit">Proceed</button>
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