import React, { useState } from 'react';

const BroadcastAlertEditor = () => {
  const [message, setMessage] = useState('');
  const sendBroadcast = () => {
    // Save to Firestore and notify users
    alert('Broadcast sent: ' + message);
  };

  return (
    <div className="broadcast-editor">
      <h2>Broadcast Alert</h2>
      <textarea
        placeholder="Enter message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendBroadcast}>Send Alert</button>
    </div>
  );
};

export default BroadcastAlertEditor;