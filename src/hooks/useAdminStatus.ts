import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust this import to your Firebase config path

type AdminStatus = {
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
};

/**
 * Checks if the current Firebase user is an admin (via Firestore roles).
 * Returns { isAdmin, loading, error }
 */
export function useAdminStatus(): AdminStatus {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state before checking admin status
    setError(null);
    setIsAdmin(false);
    setLoading(true);

    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const adminDocRef = doc(db, "admins", user.uid);
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists() && adminDoc.data().isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to check admin status.");
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { isAdmin, loading, error };
}
