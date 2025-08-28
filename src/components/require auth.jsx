--- /dev/null
+++ b/src/components/RequireAuth.jsx
@@ -0,0 +1,9 @@
+import React from 'react';
+
+const RequireAuth = ({ children }) => {
+  return (
+    <div>
+      {children}
+    </div>
+  );
+};
+
+export default RequireAuth;