--- /dev/null
 b/src/pwa/registerSW.js
@@ -0,0 1,25 @@
export function registerSW() {
  // Temporary: disable to avoid stale shell caching while we stabilize routing
  return;
}

export const unregisterSW = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
};

// Auto-register in production
if (process.env.NODE_ENV === 'production') registerSW();