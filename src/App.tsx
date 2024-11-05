// src/App.tsx
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import UpcomingSection from './components/UpcomingSection';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => setIsAuthenticated(false));
    };

    return (
        <div className="app">
            <Navbar 
                isAuthenticated={isAuthenticated} 
                onLogin={() => setIsAuthenticated(true)} 
                onLogout={handleLogout} 
            />
            <UpcomingSection isAuthenticated={isAuthenticated} />
        </div>
    );
};

export default App;
