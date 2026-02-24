import { feelingsIcon, TFeeling } from "@/utils/const";
import { View } from "react-native";
import Card from "../Card";
import { useFirebase } from "../FirebaseProvider";
import { Typography } from "../Typography";

const AllEntriesFeels = () => {
  const { getNotes, getFeelingsPercent: getFeelings } = useFirebase();
  const notes = getNotes();
  const feelings = getFeelings();

  return (
    <Card>
      <Typography>Your feel for your {notes.length} entries</Typography>
      {Object.entries(feelingsIcon).map((feelingIcon) => {
        return (
          <View key={feelingIcon[0]} style={{ flexDirection: "row", gap: 20 }}>
            {feelingIcon[1]}
            <Typography>{feelings[feelingIcon[0] as TFeeling]}%</Typography>
          </View>
        );
      })}
    </Card>
  );
};

export default AllEntriesFeels;
