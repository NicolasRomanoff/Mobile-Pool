import mobileStyles from "@/assets/style";
import { Button } from "@/components/Button";
import { useFirebase } from "@/components/FirebaseProvider";
import NewEntryModal from "@/components/NewEntryModal";
import Notes from "@/components/Notes";
import { Typography } from "@/components/Typography";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Diary = () => {
  const { logOut } = useFirebase();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <SafeAreaView style={mobileStyles.container}>
      <Notes />
      <NewEntryModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <Button onClick={() => setIsModalVisible(true)}>
        <Typography color="black">New diary entry</Typography>
      </Button>
      <Button onClick={logOut}>
        <Typography color="black">Log out</Typography>
      </Button>
    </SafeAreaView>
  );
};

export default Diary;
