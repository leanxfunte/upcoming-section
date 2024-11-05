// src/components/Navbar.tsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import Login from './Login';
import '../styles/Navbar.scss';

interface NavbarProps {
    isAuthenticated: boolean;
    onLogin: () => void;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogin, onLogout }) => {
    const [showLogin, setShowLogin] = useState(false);

    const toggleLogin = () => {
        setShowLogin((prev) => !prev);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>Upcoming Section</h1>
            </div>
            <div className="navbar-links">
                {isAuthenticated ? (
                    <button onClick={onLogout} className="navbar-button logout">
                        Logout
                    </button>
                ) : (
                    <button onClick={toggleLogin} className="navbar-button login">
                        Login
                    </button>
                )}
            </div>
            {showLogin && !isAuthenticated && (
                <div className="login-dropdown">
                    <Login onLogin={() => {
                        onLogin();
                        setShowLogin(false);
                    }} />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
