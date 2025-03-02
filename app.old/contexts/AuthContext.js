/**
 * 
 */
import React, { createContext, useContext, useState } from 'react';
//const jwt_decode = require('jwt-decode');
import { jwtDecode }  from 'jwt-decode';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    console.log('jwt_decode', jwtDecode );
    
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem('access');
        console.log('No token found in localStorage');
        if (!token) return false;
    
        const { exp } = jwtDecode (token); 
        if (Date.now() >= exp * 1000) {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          return false; 
        }
        return true; 
      }

      return false;
    });

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
