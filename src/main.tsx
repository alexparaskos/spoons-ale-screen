import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
try {
  const wakeLock = await navigator.wakeLock.request("screen");
} catch (err: any) {
  // the wake lock request fails - usually system related, such being low on battery
  console.log(`${err.name}, ${err.message}`);
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);