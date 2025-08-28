import { app } from './firebaseConfig';
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app);

export function callFunction(name: string, data?: any) {
  const fn = httpsCallable(functions, name);
  return fn(data);
}