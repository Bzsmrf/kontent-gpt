import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';


// Use type assertion to tell TypeScript that createRoot exists
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);