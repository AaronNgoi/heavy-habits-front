import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {onAuthStateChanged} from "firebase/auth";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect( () => {
        const listen = onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
            setLoading(false);
        });

        return () => {
            listen();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};