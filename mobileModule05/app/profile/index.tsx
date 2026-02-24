import mobileStyles from "@/assets/style";
import { Button } from "@/components/Button";
import { useFirebase } from "@/components/FirebaseProvider";
import NewEntryModal from "@/components/NewEntryModal";
import AllEntriesFeels from "@/components/profile/AllEntriesFeels";
import LastDiaryEntries from "@/components/profile/LastDiaryEntries";
import Profile from "@/components/profile/Profile";
import { Typography } from "@/components/Typography";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Diary = () => {
  const { user } = useFirebase();
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!user) return <View></View>;

  return (
    <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
      <SafeAreaView style={mobileStyles.container}>
        <Profile />
        <LastDiaryEntries />
        <AllEntriesFeels />
        <NewEntryModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
        <Button onClick={() => setIsModalVisible(true)}>
          <Typography color="black">New diary entry</Typography>
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Diary;
