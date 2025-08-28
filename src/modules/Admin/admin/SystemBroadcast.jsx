
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';

export default function SystemBroadcast() {
  const [message, setMessage] = useState('');

  const sendBroadcast = () => {
    if (message.trim()) {
      alert(`Broadcast sent: ${message}`);
      setMessage('');
    }
  };

  return (
    <Card>
      <CardHeader>System Broadcast</CardHeader>
      <CardContent>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type broadcast message"
          className="border rounded p-2 w-full mb-2"
        />
        <Button onClick={sendBroadcast}>Send Broadcast</Button>
      </CardContent>
    </Card>
  );
}
