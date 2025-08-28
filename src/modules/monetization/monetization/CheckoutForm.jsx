
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';

export default function CheckoutForm({ plan }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleCheckout = () => {
    if (plan) {
      alert(`Processing payment for ${plan.name}`);
    }
  };

  return (
    <Card>
      <CardHeader>Checkout</CardHeader>
      <CardContent>
        {plan ? (
          <>
            <p className="mb-4">You selected: <strong>{plan.name}</strong> — ${plan.price} / month</p>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border rounded p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="border rounded p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="border rounded p-2 w-full mb-2"
            />
            <Button onClick={handleCheckout}>Pay Now</Button>
          </>
        ) : (
          <p>Please select a plan before checkout.</p>
        )}
      </CardContent>
    </Card>
  );
}
