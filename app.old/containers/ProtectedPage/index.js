import React, { useEffect } from 'react';
import history from '../../utils/history';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const ProtectedPage = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = () => {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      setIsAuthenticated(false);
      history.push('/login');
  };

  useEffect(() => {
    const checkSession = async () => {
      const accessToken = localStorage.getItem('access');

      if (!accessToken) {
        setIsAuthenticated(false);
        history.push('/login');
        return;
      }

      try {
        // Validate token with the backend (you can use an existing endpoint like `/user/`)
        await axios.get('http://localhost:8080/api/auth/user/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Session expired, log out the user
          setIsAuthenticated(false);
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          history.push('/login');
        } else {
          console.error('Error validating session:', error);
        }
      }
    };

    checkSession();
  }, [isAuthenticated, setIsAuthenticated, history]);

  return isAuthenticated ? (
    <div>
      <h1>Welcome to the Protected Page</h1>
      <p>You are logged in!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : null;
};

export default ProtectedPage;
