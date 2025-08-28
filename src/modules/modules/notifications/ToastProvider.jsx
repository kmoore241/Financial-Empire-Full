
import React from 'react';
import { ToastProvider as CoreToastProvider } from '../../components/misc/notifications/useToasts';
import Toaster from '../../components/misc/notifications/Toaster';

/**
 * Wraps the app and renders the <Toaster/> portal.
 */
export function ToastProvider({ children }){
  return (
    <CoreToastProvider>
      {children}
      <Toaster />
    </CoreToastProvider>
  );
}
