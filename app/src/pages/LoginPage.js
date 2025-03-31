import React from 'react';
import '../styles/LoginPage.css';

function LoginPage() {
    return (
        <>
            <title>Login Page</title>
            <div className="main-container">
                <header>
                    Login to your account.
                </header>
                <div className="LoginForm">
                    <input type="text" placeholder="Username" required />
                    <input type="password" placeholder="Password" required />
                </div>
                <div className="LoginButton">
                    <button>Login</button>
                </div>
                <div className="register-section">
                    Don't have an account? <a href="/signup">Register</a>
                </div>
            </div>
        </>
    );
}

export default LoginPage;