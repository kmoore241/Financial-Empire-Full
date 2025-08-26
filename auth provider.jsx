--- /dev/null
+++ b/src/components/AuthProvider.jsx
@@ -0,0 +1,9 @@
+import React from 'react';
+
+const AuthProvider = ({ children }) => {
+  return (
+    <div>
+      {children}
+    </div>
+  );
+};
+
+export default AuthProvider;