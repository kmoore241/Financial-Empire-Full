--- /dev/null
+++ b/src/pages/NotFound.jsx
@@ -0,0 +1,12 @@
+import React from 'react';
+
+const NotFound = () => {
+  return (
+    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
+      <div className="text-center">
+        <h1 className="text-4xl font-bold text-empire mb-4">404</h1>
+        <p className="text-gray-600">Page not found</p>
+      </div>
+    </div>
+  );
+};
+
+export default NotFound;