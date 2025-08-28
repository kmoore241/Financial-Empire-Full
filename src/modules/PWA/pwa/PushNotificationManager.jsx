
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function PushNotificationManager() {
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = () => {
    // Placeholder logic; in production, integrate with backend push service
    setSubscribed(true);
    alert('Subscribed to push notifications!');
  };

  const unsubscribe = () => {
    setSubscribed(false);
    alert('Unsubscribed from push notifications.');
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold mb-2">Push Notifications</h2>
      {subscribed ? (
        <Button onClick={unsubscribe}>Unsubscribe</Button>
      ) : (
        <Button onClick={subscribe}>Subscribe</Button>
      )}
    </div>
  );
}
