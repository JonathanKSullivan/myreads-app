import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import './variables.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light', // or 'dark' if you want a dark theme
        fontFamily: 'Roboto, sans-serif', // Customize the global font
        headings: {
          fontFamily: 'Montserrat, sans-serif', // Customize the font for headings
        },
        colors: {
          brandPrimary: [
            '#e6f7ff',
            '#bae7ff',
            '#91d5ff',
            '#69c0ff',
            '#40a9ff',
            '#1890ff',
            '#096dd9',
            '#0050b3',
            '#003a8c',
            '#002766',
          ],
          // Customize or add other color scales here
        },
        primaryColor: 'brandPrimary', // Set the primary color used by Mantine components
        spacing: {
          xs: 'var(--spacing-xs)',
          sm: 'var(--spacing-sm)',
          md: 'var(--spacing-md)',
          lg: 'var(--spacing-lg)',
          xl: 'var(--spacing-xl)',
        },
        radius: {
          sm: 'var(--border-radius-sm)',
          md: 'var(--border-radius-md)',
          lg: 'var(--border-radius-lg)',
        },
        shadows: {
          xs: 'var(--box-shadow-sm)',
          sm: 'var(--box-shadow-md)',
          md: 'var(--box-shadow-lg)',
        },
        other: {
          headerHeight: '60px',
        },
      }}
    >
      <Router>
        <App />
      </Router>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
