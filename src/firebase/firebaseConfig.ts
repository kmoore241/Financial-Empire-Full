// src/firebase/firebaseConfig.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const req = (k: string): string => {
  const v = process.env[k];
  if (!v) throw new Error(`Missing env ${k}`);
  return v;
};

const firebaseConfig = {
  apiKey: req("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: req("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: req("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: req("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: req("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: req("NEXT_PUBLIC_FIREBASE_APP_ID"),
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
export const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analyticsPromise = isSupported().then(ok => (ok ? getAnalytics(app) : null));