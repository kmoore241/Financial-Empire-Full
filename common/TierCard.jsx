import React from 'react';

const TierCard = ({ title, locked }) => (
  <div className={locked ? 'tier-card locked' : 'tier-card'}>
    <h3>{title}</h3>
    {locked && <div className="overlay">Locked</div>}
  </div>
);

export default TierCard;