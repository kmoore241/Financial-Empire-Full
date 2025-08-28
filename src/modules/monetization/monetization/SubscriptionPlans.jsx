
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';

export default function SubscriptionPlans({ plans = [], onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans.map((plan, idx) => (
        <Card key={idx}>
          <CardHeader>{plan.name}</CardHeader>
          <CardContent>
            <p className="mb-2">{plan.description}</p>
            <p className="font-bold mb-4">${plan.price} / month</p>
            <Button onClick={() => onSelect(plan)}>Choose Plan</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
