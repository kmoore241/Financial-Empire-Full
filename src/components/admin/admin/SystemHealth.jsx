
import React from 'react';

function Ping({ name, ok }){
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="text-sm">{name}</div>
      <div className={`w-2 h-2 rounded-full ${ok ? 'bg-green-500' : 'bg-red-500'}`} />
    </div>
  );
}

export default function SystemHealth(){
  const [services] = React.useState([
    { name: 'API Gateway', ok: true },
    { name: 'Auth (Firebase)', ok: true },
    { name: 'Firestore', ok: true },
    { name: 'Storage', ok: true },
    { name: 'Charts Provider', ok: false },
  ]);

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold mb-3">System Health</h3>
      <div className="grid md:grid-cols-2 gap-2">
        {services.map(s => <Ping key={s.name} name={s.name} ok={s.ok} />)}
      </div>
    </div>
  );
}
