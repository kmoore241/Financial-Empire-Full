import React, { useState } from 'react';

const PerformanceToggle = () => {
  const [perfMode, setPerfMode] = useState(false);
  return (
    <div className="performance-toggle">
      <label>
        <input
          type="checkbox"
          checked={perfMode}
          onChange={() => setPerfMode(!perfMode)}
        />
        Performance Mode
      </label>
    </div>
  );
};

export default PerformanceToggle;