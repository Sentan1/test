import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  // Check if we have already mounted to prevent issues with Shopify's hot-reloading in the editor
  if (!rootElement.innerHTML.includes('data-react-helmet')) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
} else {
  console.error("Could not find root element to mount to. Ensure layout/theme.liquid has <div id='root'></div>");
}