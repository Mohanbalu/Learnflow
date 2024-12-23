import React from 'react'; // Correct import statement for React
import { createRoot } from 'react-dom/client'; // Correct import for createRoot from 'react-dom/client'
import './index.css'; // Correct path for the CSS file
import App from './App'; // Correct import for App
import reportWebVitals from './reportWebVitals'; // Correct path for reportWebVitals

// Create a root and render the App component
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
