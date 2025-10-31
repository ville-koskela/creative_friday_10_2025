import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { SettingsProvider, WindowProvider } from './contexts';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <SettingsProvider>
      <WindowProvider>
        <App />
      </WindowProvider>
    </SettingsProvider>
  </StrictMode>
);
