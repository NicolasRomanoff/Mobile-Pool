import {
  dateFormat,
  providers,
  TEntryNote,
  TNote,
  TProvider,
} from "@/utils/const";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { FirebaseError, getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBq41inLeGeudlThoEXgopCqZpGcf7USYA",
  authDomain: "diaryapp-e6bbb.firebaseapp.com",
  projectId: "diaryapp-e6bbb",
  storageBucket: "diaryapp-e6bbb.firebasestorage.app",
  messagingSenderId: "237006770065",
  appId: "1:237006770065:web:7fad132c04e556fa2b5430",
  measurementId: "G-HJMGQ4Q6JK",
};

if (!getApps().length) initializeApp(firebaseConfig);

preventAutoHideAsync();

type TFirebaseContext = {
  user: User | null;
  isLoading: boolean;
  logIn: (provider: TProvider) => Promise<void>;
  logOut: () => Promise<void>;
  getNotes: () => TNote[];
  addNote: (note: TEntryNote) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

const FirebaseContext = createContext<TFirebaseContext | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<TNote[]>([]);

  const app = getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return subscriber;
  }, []);

  useEffect(() => {
    if (!isLoading) hideAsync();
  }, [isLoading]);

  useEffect(() => {
    if (!user) return setNotes([]);

    const notesCollection = query(
      collection(db, "notes"),
      where("usermail", "==", user.email),
      orderBy("date", "desc"),
    );
    onSnapshot(notesCollection, (querySnapshot) => {
      const fetchedNotes = querySnapshot.docs.map(
        (notesDoc) =>
          ({
            ...notesDoc.data(),
            id: notesDoc.id,
          }) as TNote,
      );
      setNotes(fetchedNotes);
    });
  }, [db, user]);

  const logIn = async (provider: TProvider) => {
    try {
      await signInWithPopup(auth, providers[provider]);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log("Connexion error : ", error.message);
      } else console.log("Unknown error : ", error);
    }
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const getNotes = () => notes;

  const addNote = async (note: TEntryNote) => {
    await addDoc(collection(db, "notes"), {
      ...note,
      usermail: user?.email,
      date: format(new Date(), dateFormat, {
        locale: fr,
      }),
    });
  };

  const deleteNote = async (id: string) => {
    await deleteDoc(doc(db, "notes", id));
  };

  return (
    <FirebaseContext.Provider
      value={{ user, isLoading, logIn, logOut, getNotes, addNote, deleteNote }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within an FirebaseProvider");
  }
  return context;
};
