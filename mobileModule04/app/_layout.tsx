import { router, Stack } from "expo-router";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq41inLeGeudlThoEXgopCqZpGcf7USYA",
  authDomain: "diaryapp-e6bbb.firebaseapp.com",
  projectId: "diaryapp-e6bbb",
  storageBucket: "diaryapp-e6bbb.firebasestorage.app",
  messagingSenderId: "237006770065",
  appId: "1:237006770065:web:7fad132c04e556fa2b5430",
  measurementId: "G-HJMGQ4Q6JK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) router.push("../diary");
});

const RootLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default RootLayout;
