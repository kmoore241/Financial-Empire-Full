
import React from 'react';
import { BacktestPanel } from '../../components/bots';

/**
 * Thin wrapper around BacktestPanel so you can drop it into routes/modules easily.
 */
export default function Backtester({ symbol='BTC', onResult }){
  return <BacktestPanel symbol={symbol} onResult={onResult} />;
}
