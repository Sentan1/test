import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Shopify Theme Editor Compatibility Fix:
 * Ensure we only mount the application once and target the correct root element.
 * The editor often re-runs scripts or re-renders the DOM, so we check for
 * existing application markers.
 */

const init = () => {
  const rootElement = document.getElementById('root');

  if (rootElement) {
    // Check if the root has already been initialized to prevent multiple mounts in Editor
    if (rootElement.children.length === 0) {
      try {
        const root = ReactDOM.createRoot(rootElement);
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
      } catch (error) {
        console.error("React mounting failed:", error);
      }
    }
  } else {
    // In some Shopify configurations, the script might run before the DOM is fully ready
    console.warn("Root element #root not found. Retrying in 100ms...");
    setTimeout(init, 100);
  }
};

// Start initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
