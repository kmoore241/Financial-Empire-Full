--- /dev/null
+++ b/src/pwa/registerSW.js
@@ -0,0 +1,25 @@
+export const registerSW = () => {
+  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
+    window.addEventListener('load', () => {
+      navigator.serviceWorker
+        .register('/service-worker.js')
+        .then((registration) => {
+          console.log('SW registered: ', registration);
+        })
+        .catch((registrationError) => {
+          console.log('SW registration failed: ', registrationError);
+        });
+    });
+  }
+};
+
+export const unregisterSW = () => {
+  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
+    navigator.serviceWorker.ready.then((registration) => {
+      registration.unregister();
+    });
+  }
+};
+
+// Auto-register in production
+if (process.env.NODE_ENV === 'production') registerSW();