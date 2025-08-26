// src/components/BotSettings.jsx
import React, { useState } from 'react';

const BotSettings = ({ onSave }) => {
  const [risk, setRisk] = useState(1);
  const [stopLoss, setStopLoss] = useState(0.5);

  const saveSettings = () => {
    onSave({ risk, stopLoss });
  };

  return (
    <div className="bot-settings">
      <h2>Bot Settings</h2>
      <label>
        Risk Percentage:
        <input type="number" value={risk} onChange={e => setRisk(e.target.value)} />
      </label>
      <label>
        Stop Loss (%):
        <input type="number" value={stopLoss} onChange={e => setStopLoss(e.target.value)} />
      </label>
      <button onClick={saveSettings}>Save</button>
    </div>
  );
};

export default BotSettings;
