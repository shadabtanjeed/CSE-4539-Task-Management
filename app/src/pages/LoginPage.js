import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();


    };

    return (
        <div className="main-container">
            <header>
                Login to your account.
            </header>
            <form onSubmit={handleSubmit}>
                <div className="LoginForm">
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
                <div className="LoginButton">
                    <button type="submit">Login</button>
                </div>
            </form>
            <div className="register-section">
                Don't have an account? <a href="/signup">Register</a>
            </div>
        </div>
    );
}

export default LoginPage;