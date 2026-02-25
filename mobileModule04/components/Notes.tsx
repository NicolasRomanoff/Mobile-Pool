import { useFirebase } from "@/components/FirebaseProvider";
import { ScrollView, View } from "react-native";
import { Typography } from "./Typography";

import { black } from "@/assets/style";
import { feelingsIcon, TNote } from "@/utils/const";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { useState } from "react";
import { Button } from "./Button";
import Modal from "./Modal";

const NoteModal: React.FC<{
  note: TNote;
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
}> = ({ note, isModalVisible, setIsModalVisible }) => {
  const { deleteNote } = useFirebase();
  const dateObj = note.date.toDate();

  const day = dateObj.getDate();
  const dayName = format(dateObj, "EEEE", { locale: enUS });
  const month = format(dateObj, "LLLL", { locale: enUS });
  const year = dateObj.getFullYear();

  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
    >
      <Typography>{`${dayName}, ${month} ${day}, ${year}`}</Typography>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Typography>My feelings :</Typography>
        {feelingsIcon[note.icon]}
      </View>
      <ScrollView>
        <Typography>{note.text}</Typography>
      </ScrollView>
      <Button
        onClick={() => {
          deleteNote(note.id);
          setIsModalVisible(false);
        }}
      >
        <Typography color="red">Delete</Typography>
      </Button>
    </Modal>
  );
};

const NoteCard: React.FC<{ note: TNote }> = ({ note }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dateObj = note.date.toDate();

  const day = dateObj.getDate();
  const month = format(dateObj, "LLLL", { locale: enUS });
  const year = dateObj.getFullYear();

  return (
    <View>
      <NoteModal
        note={note}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <Button onClick={() => setIsModalVisible(true)}>
        <View
          style={{
            backgroundColor: black,
            flexDirection: "row",
            borderRadius: 10,
            padding: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <View>
            <Typography>{day}</Typography>
            <Typography>
              {month.charAt(0).toUpperCase() + month.slice(1)}
            </Typography>
            <Typography size="sm" color="grey">
              {year}
            </Typography>
          </View>
          <View>{feelingsIcon[note.icon]}</View>
          <Typography numberOfLines={1} ellipsizeMode="head">
            {note.title}
          </Typography>
        </View>
      </Button>
    </View>
  );
};

const Notes = () => {
  const { getNotes } = useFirebase();
  const notes = getNotes();

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Typography>Your diary notes</Typography>
      <ScrollView
        style={{
          flex: 1,
          padding: 10,
          width: "100%",
        }}
      >
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
        {!notes.length && <Typography>No diary</Typography>}
      </ScrollView>
    </View>
  );
};

export default Notes;
