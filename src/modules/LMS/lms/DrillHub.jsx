import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import SupportResistanceDrill from '@/components/drills/SupportResistanceDrill';
import MACrossoverDrill from '@/components/drills/MACrossoverDrill';
import RSIMACDDrill from '@/components/drills/RSIMACDDrill';

export default function DrillHub() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading Drills</CardTitle>
      </CardHeader>
      <CardContent>
        <SupportResistanceDrill />
        <MACrossoverDrill />
        <RSIMACDDrill />
      </CardContent>
    </Card>
  );
}