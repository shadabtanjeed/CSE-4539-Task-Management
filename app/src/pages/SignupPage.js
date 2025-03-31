import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupPage.css';

function SignupPage() {
    const navigate = useNavigate();

    const handleProceed = () => {
        // add form validation later.
        navigate('/otp-verification');
    };

    return (
        <>
            <title>Signup Page</title>
            <div className="main-container">
                <header>
                    Create a new account.
                </header>
                <div className="SignupForm">
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                </div>
                <div className="ProceedButton">
                    <button onClick={handleProceed}>Proceed</button>
                </div>
                <div className="login-section">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </>
    );
}

export default SignupPage;