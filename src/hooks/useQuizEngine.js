// src/hooks/useQuizEngine.js
import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { QUIZ_COLLECTION } from '../utils/constants';

export default function useQuizEngine() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      const snapshot = await getDocs(collection(db, QUIZ_COLLECTION));
      const q = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(q);
      setLoading(false);
    }
    fetchQuestions();
  }, []);

  return { questions, loading };
}
