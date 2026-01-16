import { useAuth } from "@/components/AuthProvider";
import { Modal, ScrollView, View } from "react-native";
import { Typography } from "./Typography";

import { black } from "@/assets/style";
import { dateFormat, feelingsIcon, TNote } from "@/utils/const";
import { format, parse } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Button } from "./Button";

const NoteModal: React.FC<{
  note: TNote;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ note, modalVisible, setModalVisible }) => {
  const { deleteNote } = useAuth();
  const dateObj = parse(note.date, dateFormat, new Date(), { locale: fr });

  const day = dateObj.getDate();
  const dayName = format(dateObj, "EEEE", { locale: enUS });
  const month = format(dateObj, "LLLL", { locale: enUS });
  const year = dateObj.getFullYear();

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={{ flex: 1, backgroundColor: black, padding: 30, gap: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography>{`${dayName}, ${month} ${day}, ${year}`}</Typography>
          <Button
            variant="ghost"
            onClick={() => setModalVisible(!modalVisible)}
          >
            <Typography color="red">X</Typography>
          </Button>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Typography>My feelings :</Typography>
          {feelingsIcon[note.icon]}
        </View>
        <Typography>{note.text}</Typography>
        <Button
          onClick={() => {
            deleteNote(note.id);
            setModalVisible(false);
          }}
        >
          <Typography color="red">Delete</Typography>
        </Button>
      </View>
    </Modal>
  );
};

const NoteCard: React.FC<{ note: TNote }> = ({ note }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dateObj = parse(note.date, dateFormat, new Date(), { locale: fr });

  const day = dateObj.getDate();
  const month = format(dateObj, "LLLL", { locale: enUS });
  const year = dateObj.getFullYear();

  return (
    <View>
      <NoteModal
        note={note}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Button onClick={() => setModalVisible(true)}>
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
  const { getNotes } = useAuth();
  const [notes, setNotes] = useState<TNote[]>([]);

  useEffect(() => {
    const fetchNotes = async () => setNotes(await getNotes());
    fetchNotes();
  }, [getNotes, setNotes]);

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
        {notes.map((note, i) => (
          <NoteCard key={i} note={note} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Notes;
