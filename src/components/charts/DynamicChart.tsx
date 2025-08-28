import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Dynamic import for chart components to reduce initial bundle size
const Chart = dynamic(() => import('recharts').then(mod => ({ default: mod.ResponsiveContainer })), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-gray-500 text-sm">Loading chart...</div>
    </div>
  )
})

export const DynamicChart = Chart as ComponentType<any>