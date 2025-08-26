
import React from 'react';

export default function OrderTicket({ onSubmit, symbol='BTC' }){
  const [side, setSide] = React.useState('long');
  const [entry, setEntry] = React.useState(100);
  const [stop, setStop] = React.useState(98);
  const [qty, setQty] = React.useState(1);

  return (
    <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="text-sm font-semibold mb-2">Order Ticket</div>
      <div className="grid md:grid-cols-5 gap-2 text-sm">
        <select value={side} onChange={e=>setSide(e.target.value)} className="rounded bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2">
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
        <input type="number" value={entry} onChange={e=>setEntry(+e.target.value)} className="rounded bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2" placeholder="Entry"/>
        <input type="number" value={stop} onChange={e=>setStop(+e.target.value)} className="rounded bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2" placeholder="Stop"/>
        <input type="number" value={qty} onChange={e=>setQty(+e.target.value)} className="rounded bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2" placeholder="Qty"/>
        <button onClick={()=>onSubmit?.({ symbol, side, entry, stop, qty })} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Open</button>
      </div>
    </div>
  );
}
