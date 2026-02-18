import mobileStyles from "@/assets/style";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/Button";
import NewEntryModal from "@/components/NewEntryModal";
import Notes from "@/components/Notes";
import { Typography } from "@/components/Typography";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Diary = () => {
  const { logOut } = useAuth();
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
