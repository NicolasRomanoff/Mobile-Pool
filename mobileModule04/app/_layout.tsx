import { Stack } from "expo-router";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBq41inLeGeudlThoEXgopCqZpGcf7USYA",
  authDomain: "diaryapp-e6bbb.firebaseapp.com",
  projectId: "diaryapp-e6bbb",
  storageBucket: "diaryapp-e6bbb.firebasestorage.app",
  messagingSenderId: "237006770065",
  appId: "1:237006770065:web:7fad132c04e556fa2b5430",
  measurementId: "G-HJMGQ4Q6JK",
};

initializeApp(firebaseConfig);

const RootLayout = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), (user) => setUser(user));
    return subscriber;
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login/index" />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="diary/index" />
      </Stack.Protected>
    </Stack>
  );
};

export default RootLayout;
