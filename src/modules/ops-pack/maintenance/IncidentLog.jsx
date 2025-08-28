
import React from 'react';

export default function IncidentLog(){
  const [items, setItems] = React.useState(()=> JSON.parse(localStorage.getItem('fe:maintenance:incidents')||'[]'));
  React.useEffect(()=> localStorage.setItem('fe:maintenance:incidents', JSON.stringify(items)), [items]);
  const add = (txt) => setItems([{ id:'i'+Date.now(), txt, t:Date.now() }, ...items]);
  const clear = () => setItems([]);

  return (
    <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div className="font-medium text-sm">Incident Log</div>
        <div className="flex gap-2">
          <button className="px-2 py-1 rounded border text-xs" onClick={()=>add('Manual incident added')}>Add</button>
          <button className="px-2 py-1 rounded border text-xs" onClick={clear}>Clear</button>
        </div>
      </div>
      <ul className="mt-2 text-sm">
        {items.map(i=> <li key={i.id} className="border-t py-1">{new Date(i.t).toLocaleString()} — {i.txt}</li>)}
      </ul>
    </div>
  );
}
