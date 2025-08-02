import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Enhanced timer function binding for WebContainer environment
try {
  // Store original timer functions
  const originalSetTimeout = globalThis.setTimeout;
  const originalSetInterval = globalThis.setInterval;
  const originalClearTimeout = globalThis.clearTimeout;
  const originalClearInterval = globalThis.clearInterval;

  // Create wrapper functions that preserve context
  const wrappedSetTimeout = function(callback, delay, ...args) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function');
    }
    return originalSetTimeout.call(globalThis, callback, delay, ...args);
  };

  const wrappedSetInterval = function(callback, delay, ...args) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function');
    }
    return originalSetInterval.call(globalThis, callback, delay, ...args);
  };

  const wrappedClearTimeout = function(id) {
    return originalClearTimeout.call(globalThis, id);
  };

  const wrappedClearInterval = function(id) {
    return originalClearInterval.call(globalThis, id);
  };

  // Apply to all possible global contexts
  if (typeof window !== 'undefined') {
    window.setTimeout = wrappedSetTimeout;
    window.setInterval = wrappedSetInterval;
    window.clearTimeout = wrappedClearTimeout;
    window.clearInterval = wrappedClearInterval;
  }

  if (typeof global !== 'undefined') {
    global.setTimeout = wrappedSetTimeout;
    global.setInterval = wrappedSetInterval;
    global.clearTimeout = wrappedClearTimeout;
    global.clearInterval = wrappedClearInterval;
  }

  // Also apply to globalThis
  globalThis.setTimeout = wrappedSetTimeout;
  globalThis.setInterval = wrappedSetInterval;
  globalThis.clearTimeout = wrappedClearTimeout;
  globalThis.clearInterval = wrappedClearInterval;

} catch (error) {
  console.warn('Timer function binding failed:', error);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)