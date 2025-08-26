
import React from 'react';
import { createRoot } from 'react-dom/client';

// Context Providers
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { BotProvider } from './contexts/BotContext';
import { LMSProvider } from './contexts/LMSContext';
import { MarketProvider } from './contexts/MarketContext';

// Notifications (module)
import { ToastProvider } from './modules/notifications/ToastProvider';

import App from './App';
import './styles.css';
import registerSW from './pwa/registerSW';

registerSW();

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <MarketProvider>
          <BotProvider>
            <LMSProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </LMSProvider>
          </BotProvider>
        </MarketProvider>
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>
);
