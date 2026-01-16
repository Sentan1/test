import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Shopify Theme Editor Compatibility Fix:
 * In the Editor, the script might be executed multiple times or the DOM 
 * might be re-rendered via AJAX. We use a global flag to ensure 
 * we only create the root once.
 */

declare global {
  interface Window {
    __REACT_ROOT_INITIALIZED__?: boolean;
  }
}

const mount = () => {
  const rootElement = document.getElementById('root');

  if (rootElement) {
    if (!window.__REACT_ROOT_INITIALIZED__) {
      try {
        // Clear the loading placeholder if it exists
        const placeholder = rootElement.querySelector('.shopify-section-loading-placeholder');
        if (placeholder) {
          rootElement.removeChild(placeholder);
        }

        const root = ReactDOM.createRoot(rootElement);
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
        window.__REACT_ROOT_INITIALIZED__ = true;
      } catch (error) {
        console.error("React mounting failed:", error);
      }
    }
  } else {
    // Retry once if the DOM isn't ready
    setTimeout(() => {
      const retryRoot = document.getElementById('root');
      if (retryRoot && !window.__REACT_ROOT_INITIALIZED__) {
        mount();
      }
    }, 100);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}