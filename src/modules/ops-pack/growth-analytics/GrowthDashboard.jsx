
import React from 'react';
import { AreaChart } from '../../components/misc/charts/AreaChart';

export default function GrowthDashboard({ data }){
  const series = data?.map(d=>d.users) ?? [];
  return (
    <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
      <div className="text-sm text-gray-500">Monthly Active Users</div>
      <div className="mt-2">
        <AreaChart data={series} />
      </div>
    </div>
  );
}
