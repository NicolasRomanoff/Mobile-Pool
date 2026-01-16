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
import { getApp, getApps, initializeApp } from "firebase/app";
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
  getDocs,
  getFirestore,
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

type TAuthContext = {
  user: User | null;
  isLoading: boolean;
  logIn: (provider: TProvider) => Promise<void>;
  logOut: () => Promise<void>;
  getNotes: () => Promise<TNote[]>;
  addNote: (note: TEntryNote) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const app = getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const logIn = async (provider: TProvider) => {
    try {
      const { user } = await signInWithPopup(auth, providers[provider]);
      console.log("User logged :", user);
    } catch {
      console.log("Connexion error");
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const getNotes = async () => {
    const notesCollection = collection(db, "notes");
    const notesDocs = await getDocs(notesCollection);
    return notesDocs.docs.map(
      (notesDoc) =>
        ({
          ...notesDoc.data(),
          id: notesDoc.id,
        } as TNote)
    );
  };

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
    <AuthContext.Provider
      value={{ user, isLoading, logIn, logOut, getNotes, addNote, deleteNote }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
