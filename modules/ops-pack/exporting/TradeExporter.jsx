
import React from 'react';
import { exportCSV, exportJSON } from './io';

export default function TradeExporter({ trades=[], filename='trades' }){
  return (
    <div className="flex gap-2">
      <button className="px-3 py-2 rounded-lg border" onClick={()=>exportCSV(`${filename}.csv`, trades)}>Export CSV</button>
      <button className="px-3 py-2 rounded-lg border" onClick={()=>exportJSON(`${filename}.json`, trades)}>Export JSON</button>
    </div>
  );
}
