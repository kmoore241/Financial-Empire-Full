
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function AnalyticsOverview() {
  const stats = [
    { label: 'Active Users', value: 123 },
    { label: 'Total Trades', value: 456 },
    { label: 'Avg. Daily Volume', value: '$789K' }
  ];

  return (
    <Card>
      <CardHeader>Analytics Overview</CardHeader>
      <CardContent>
        <ul>
          {stats.map((s, idx) => (
            <li key={idx} className="flex justify-between border-b py-1">
              <span>{s.label}</span>
              <span>{s.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
