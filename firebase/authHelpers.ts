import { auth } from './firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User
} from "firebase/auth";

export async function register(email: string, password: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

export async function login(email: string, password: string) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

export async function logout() {
  await signOut(auth);
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export function onUserStateChanged(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}