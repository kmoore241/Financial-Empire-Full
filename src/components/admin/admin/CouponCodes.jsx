
import React from 'react';
import { getLS, setLS } from './storage';

export default function CouponCodes(){
  const [codes, setCodes] = React.useState(getLS('fe:admin:coupons', [
    { id:'co1', code:'BETA100', type:'percent', value:100, uses:10 },
    { id:'co2', code:'FRIEND25', type:'percent', value:25, uses:50 },
  ]));
  const [draft, setDraft] = React.useState({ code:'', type:'percent', value:10, uses:100 });

  const add = () => {
    if(!draft.code) return;
    const next = [{ id:'co'+Date.now(), ...draft, value:Number(draft.value), uses:Number(draft.uses) }, ...codes];
    setCodes(next); setLS('fe:admin:coupons', next); setDraft({ code:'', type:'percent', value:10, uses:100 });
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold mb-3">Coupon Codes (Placeholder)</h3>
      <div className="grid md:grid-cols-4 gap-2 mb-3">
        <input className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2" placeholder="Code"
               value={draft.code} onChange={e=>setDraft({...draft, code:e.target.value})}/>
        <select className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"
                value={draft.type} onChange={e=>setDraft({...draft, type:e.target.value})}>
          <option value="percent">percent</option>
          <option value="fixed">fixed</option>
        </select>
        <input type="number" className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2" placeholder="Value"
               value={draft.value} onChange={e=>setDraft({...draft, value:e.target.value})}/>
        <input type="number" className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2" placeholder="Uses"
               value={draft.uses} onChange={e=>setDraft({...draft, uses:e.target.value})}/>
      </div>
      <button onClick={add} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Add Coupon</button>
      <div className="mt-4 space-y-2">
        {codes.map(c => (
          <div key={c.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-sm flex items-center justify-between">
            <div><span className="font-mono">{c.code}</span> — {c.type} {c.value} — uses left: {c.uses}</div>
            <div className="flex gap-2">
              <button className="px-2 py-1 rounded border" onClick={()=>{
                const next = codes.map(x=> x.id===c.id ? { ...x, uses: Math.max(0, x.uses-1) } : x);
                setCodes(next); setLS('fe:admin:coupons', next);
              }}>Use</button>
              <button className="px-2 py-1 rounded border" onClick={()=>{
                const next = codes.filter(x=>x.id!==c.id); setCodes(next); setLS('fe:admin:coupons', next);
              }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
