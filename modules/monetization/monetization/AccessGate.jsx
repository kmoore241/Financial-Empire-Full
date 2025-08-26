
import React from 'react';

export default function AccessGate({ userTier, requiredTier, children }) {
  const tiers = ['free', 'basic', 'premium', 'enterprise'];
  const hasAccess = tiers.indexOf(userTier) >= tiers.indexOf(requiredTier);

  if (!hasAccess) {
    return <p className="text-red-500">Upgrade your subscription to access this content.</p>;
  }
  return <>{children}</>;
}
