import mobileStyles from "@/assets/style";
import Card from "@/components/Card";
import { useFirebase } from "@/components/FirebaseProvider";
import { NoteCard } from "@/components/Notes";
import { ScrollView } from "react-native";
import { Calendar as NativeCalendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

const Calendar = () => {
  const { getNotes } = useFirebase();
  const notes = getNotes();

  return (
    <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
      <SafeAreaView style={mobileStyles.container}>
        <NativeCalendar onDayPress={(date) => console.log(date)} />
        <Card>
          <ScrollView>
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </ScrollView>
        </Card>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Calendar;
