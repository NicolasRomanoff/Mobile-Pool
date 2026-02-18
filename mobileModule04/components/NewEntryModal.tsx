import mobileStyles, { yellow } from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { TEntryNote, TFeeling } from "@/utils/const";
import { ArrowDown } from "lucide-react-native";
import { useState } from "react";
import { ModalProps, TextInput, View } from "react-native";
import { useAuth } from "./AuthProvider";
import FeelingSelector from "./FeelingSelector";
import Modal from "./Modal";

const NewEntryModal: React.FC<
  ModalProps & {
    isModalVisible: boolean;
    setIsModalVisible: (isModalVisible: boolean) => void;
  }
> = ({ isModalVisible, setIsModalVisible }) => {
  const { addNote } = useAuth();
  const [newEntry, setNewEntry] = useState<TEntryNote>({
    icon: "mid",
    text: "",
    title: "",
  });

  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
    >
      <Typography>Add an entry</Typography>
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
        disabled={!newEntry.title || !newEntry.text}
        onClick={() => {
          addNote(newEntry);
          setIsModalVisible(false);
        }}
      >
        <Typography color="black">Add</Typography>
      </Button>
    </Modal>
  );
};

export default NewEntryModal;
