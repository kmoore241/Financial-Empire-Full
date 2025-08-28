import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  addDoc
} from "firebase/firestore";

// --- USERS ---
export async function getUser(uid: string) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshot.data() : null;
}

export async function setUser(uid: string, data: any) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, data, { merge: true });
}

// --- TRADES ---
export async function getTrades(uid: string) {
  const tradesRef = collection(db, "trades");
  const q = query(tradesRef, where("userId", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addTrade(uid: string, trade: any) {
  const tradesRef = collection(db, "trades");
  await addDoc(tradesRef, { ...trade, userId: uid, timestamp: Date.now() });
}

// --- WALLETS ---
export async function getWallet(uid: string) {
  const walletRef = doc(db, "wallets", uid);
  const snapshot = await getDoc(walletRef);
  return snapshot.exists() ? snapshot.data() : null;
}

export async function setWallet(uid: string, data: any) {
  const walletRef = doc(db, "wallets", uid);
  await setDoc(walletRef, data, { merge: true });
}

// --- QUIZZES ---
export async function getQuiz(uid: string) {
  const quizRef = doc(db, "quizzes", uid);
  const snapshot = await getDoc(quizRef);
  return snapshot.exists() ? snapshot.data() : null;
}

export async function setQuiz(uid: string, data: any) {
  const quizRef = doc(db, "quizzes", uid);
  await setDoc(quizRef, data, { merge: true });
}