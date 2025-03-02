import '../styles/index.css';

import React from 'react';
import { IntlProvider } from "react-intl";
import enMessages from "../app/i18n/en.json"; // Adjust the path

import '../app/theme/themes.css'; 
import { ThemeProvider } from '../app/contexts/ThemeContext'; 
import { AuthProvider } from '../app/contexts/AuthContext';
import App from '../app/containers/App';

import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [messages, setMessages] = useState(enMessages);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    setMessages(enMessages);
    setLocale("en");
  }, []);

  return (
    <IntlProvider locale="en" messages={messages}>
        <AuthProvider>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </AuthProvider>
    </IntlProvider>
  );
}

export default MyApp;
