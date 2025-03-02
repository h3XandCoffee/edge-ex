import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import API, { refreshAccessToken } from '../utils/axios';
import { useAuth } from './AuthContext';
import { lightTheme, darkTheme } from '../theme/theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import GlobalStyles from '../theme/GlobalStyles'; 

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme === 'true' || savedTheme === null;
  });
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    if (typeof window !== "undefined" && isAuthenticated) {
      axios
        .get('http://localhost:8080/api/auth/user/', 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`, 
            },
          }
        )
        .then((response) => {
          const { theme_preference } = response.data;
          setIsDarkMode(theme_preference === 'dark');
        })
        .catch((error) => console.error('Error fetching theme preference:', error));
    }
  }, [isAuthenticated]);

  // src/contexts/ThemeProvider.js
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    }
    /*
    const rootElement = document.getElementById('MyApp');
    if (isDarkMode) {
      rootElement.classList.add('dark-theme');
      rootElement.classList.remove('light-theme');
    } else {
      rootElement.classList.add('light-theme');
      rootElement.classList.remove('dark-theme');
    } 
    */
  }, [isDarkMode]);

  const toggleTheme = async () => {
    const newMode = !isDarkMode; 
    setIsDarkMode(newMode); 

    if(typeof window !== "undefined")
      return;
    
    try {
      const accessToken = localStorage.getItem('access');

      await API.post(
        'update-theme/',
        { theme_preference: newMode ? 'dark' : 'light' },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          
          await API.post(
            'update-theme/',
            { theme_preference: newMode ? 'dark' : 'light' },
            {
              headers: { Authorization: `Bearer ${newAccessToken}` },
            }
          );
        } catch (refreshError) {
          console.error('Error refreshing token or retrying request:', refreshError);
        }
      } else {
        console.error('Error updating theme preference:', error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        <div>
          <GlobalStyles />
          {children}
        </div>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
