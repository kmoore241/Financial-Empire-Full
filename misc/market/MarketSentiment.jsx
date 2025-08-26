
import React from 'react';
import SentimentGauge from '../charts/SentimentGauge';

export default function MarketSentiment({ value=50 }){
  return (
    <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
      <div>
        <div className="text-xs uppercase text-gray-500">Market Sentiment</div>
        <div className="text-2xl font-semibold">{value>=60?'Greed': value<=40?'Fear':'Neutral'}</div>
      </div>
      <SentimentGauge value={value} />
    </div>
  );
}
