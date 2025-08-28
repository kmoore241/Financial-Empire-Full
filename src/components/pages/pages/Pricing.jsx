
import React from 'react';
export default function Pricing(){
  const plans = [
    { name:'Basic', price:'$0', points:['Paper wallet','Drills','Manual Bot'] },
    { name:'Plus', price:'$9/mo', points:['Safe Bot','Trade export','Academy'] },
    { name:'Pro', price:'$19/mo', points:['Aggressive Bot','Admin access (beta)','Priority features'] },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold">Pricing</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {plans.map(p=>(
          <div key={p.name} className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="font-medium">{p.name}</div>
            <div className="text-3xl font-semibold mt-1">{p.price}</div>
            <ul className="mt-3 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
              {p.points.map(pt=><li key={pt}>{pt}</li>)}
            </ul>
            <button className="mt-4 px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black w-full">Choose</button>
          </div>
        ))}
      </div>
    </div>
  );
}
