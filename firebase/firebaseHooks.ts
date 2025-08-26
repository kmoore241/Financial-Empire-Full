import { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, loading };
}

export function useFirestoreDoc(path: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, ...path.split('/'));
    const unsub = onSnapshot(ref, (snapshot) => {
      setData(snapshot.exists() ? snapshot.data() : null);
      setLoading(false);
    });
    return () => unsub();
  }, [path]);

  return { data, loading };
}