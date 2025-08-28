// src/firebase/dataService.js
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';

export const addDocument = (col, data) => addDoc(collection(db, col), data);
export const getCollection = async (col) => {
  const snapshot = await getDocs(collection(db, col));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const getDocument = async (col, id) => {
  const snap = await getDoc(doc(db, col, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};
export const updateDocument = (col, id, data) => updateDoc(doc(db, col, id), data);
