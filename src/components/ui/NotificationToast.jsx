// src/components/ui/NotificationToast.jsx
import React from 'react';

const NotificationToast = ({ message, type = 'info' }) => (
  <div className={`toast toast-${type}`}>
    {message}
  </div>
);

export default NotificationToast;
