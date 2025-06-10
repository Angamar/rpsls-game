/// <reference types="cypress" />

import './commands';

// Hide fetch/XHR requests in command log for cleaner output
Cypress.on('window:before:load', (win) => {
  const originalFetch = win.fetch;
  win.fetch = function (...args) {
    return originalFetch.apply(this, args);
  };
});
