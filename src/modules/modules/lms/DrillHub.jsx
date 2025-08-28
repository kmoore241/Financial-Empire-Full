
import React from 'react';
import { SupportResistanceDrill, MACrossoverDrill, RSIMACDDrill, VolumeBreakoutDrill, SmartMoneyDrill } from '../../components/drills';

export default function DrillHub(){
  return (
    <div className="space-y-6">
      <SupportResistanceDrill />
      <MACrossoverDrill />
      <RSIMACDDrill />
      <VolumeBreakoutDrill />
      <SmartMoneyDrill />
    </div>
  );
}
