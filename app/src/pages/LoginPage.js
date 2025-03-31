import React from 'react';
import '../styles/LoginPage.css';

function LoginPage() {
    return (
        <div className="main-container">
            <header>
                Login to your account.
            </header>
            <div className="LoginForm">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
            </div>
            <div className="LoginButton">
                <button>Login</button>
            </div>
        </div>
    );
}

export default LoginPage;