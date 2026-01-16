import mobileStyles, { black, yellow } from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { TFeeling, TNote } from "@/utils/const";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ArrowDown } from "lucide-react-native";
import { useState } from "react";
import { Modal, ModalProps, TextInput, View } from "react-native";
import { useAuth } from "./AuthProvider";
import FeelingSelector from "./FeelingSelector";

const NewEntryModal: React.FC<
  ModalProps & {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = ({ modalVisible, setModalVisible }) => {
  const { user, db } = useAuth();
  const [newEntry, setNewEntry] = useState<TNote>({
    date: serverTimestamp(),
    icon: "mid",
    text: "",
    title: "",
    usermail: user!.email!,
  });

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={{ flex: 1, backgroundColor: black, padding: 30, gap: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography>Add an entry</Typography>
          <Button
            variant="ghost"
            onClick={() => setModalVisible(!modalVisible)}
          >
            <Typography color="red">X</Typography>
          </Button>
        </View>
        <TextInput
          style={[mobileStyles.input, { flex: 1 / 4 }]}
          placeholder="Title"
          onChangeText={(title) =>
            setNewEntry((prev) => ({ ...prev, title: title }))
          }
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <FeelingSelector
            feeling={newEntry.icon}
            setFeeling={(feeling: TFeeling) => {
              setNewEntry((prev) => ({ ...prev, icon: feeling }));
            }}
          />
          <ArrowDown color={yellow} size={40} />
        </View>
        <TextInput
          style={[mobileStyles.input, { flex: 1 }]}
          placeholder="Text"
          multiline
          onChangeText={(text) =>
            setNewEntry((prev) => ({ ...prev, text: text }))
          }
        />
        <Button
          onClick={async () => {
            await addDoc(collection(db, "notes"), newEntry);
          }}
        >
          <Typography color="black">Add</Typography>
        </Button>
      </View>
    </Modal>
  );
};

export default NewEntryModal;
