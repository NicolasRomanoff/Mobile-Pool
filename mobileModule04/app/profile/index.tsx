import mobileStyles from "@/assets/style";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/Button";
import NewEntryModal from "@/components/NewEntryModal";
import { Typography } from "@/components/Typography";
import { TNote } from "@/utils/const";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Diary = () => {
  const { auth, db } = useAuth();
  const [notes, setNotes] = useState<TNote[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      const notesCollection = collection(db, "notes");
      const notesDocs = await getDocs(notesCollection);
      setNotes(notesDocs.docs.map((notesDoc) => notesDoc.data() as TNote));
    };
    getNotes();
  }, [db, setNotes]);

  return (
    <SafeAreaView style={mobileStyles.container}>
      {notes.map((note, i) => (
        <Typography key={i}>{note.title}</Typography>
      ))}
      <NewEntryModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Button onClick={() => setModalVisible(true)}>
        <Typography color="black">New diary entry</Typography>
      </Button>
      <Button onClick={async () => await signOut(auth)}>
        <Typography color="black">Log out</Typography>
      </Button>
    </SafeAreaView>
  );
};

export default Diary;
