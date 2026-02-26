import mobileStyles, { black, grey, white, yellow } from "@/assets/style";
import Card from "@/components/Card";
import { useFirebase } from "@/components/FirebaseProvider";
import { NoteCard } from "@/components/Notes";
import { ScrollView } from "react-native";
import { Calendar as NativeCalendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

const Calendar = () => {
  const { getNotesByDate, date, setDate } = useFirebase();
  const notes = getNotesByDate();

  return (
    <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
      <SafeAreaView style={mobileStyles.container}>
        <Card>
          <NativeCalendar
            style={{ height: 370 }}
            theme={{
              calendarBackground: white,
              selectedDayTextColor: black,
              todayTextColor: yellow,
              dayTextColor: black,
              textDisabledColor: grey,
              arrowColor: yellow,
            }}
            onDayPress={setDate}
            markedDates={
              date
                ? {
                    [date.dateString]: {
                      selected: true,
                      selectedColor: yellow,
                    },
                  }
                : undefined
            }
          />
        </Card>
        <Card style={{ height: 250 }}>
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
