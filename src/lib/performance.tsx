// Performance monitoring utilities

export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
  } else {
    fn()
  }
}

export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    // In production, send to analytics
    console.log(metric)
  }
}

// Lazy load components for better performance
export const lazyLoad = (importFn: () => Promise<any>) => {
  return dynamic(importFn, {
    ssr: false,
    loading: () => (
      <div className="h-32 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    )
  })
}

import dynamic from 'next/dynamic'