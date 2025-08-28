/* src/firebase/index.ts
   Barrel exports so imports like `@/firebase` work:
   import { db, auth, storage, analyticsPromise } from "@/firebase"
*/
export { app, auth, db, storage, analyticsPromise } from "./firebaseConfig";
