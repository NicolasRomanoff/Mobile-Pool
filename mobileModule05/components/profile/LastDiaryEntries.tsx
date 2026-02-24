import Card from "../Card";
import { useFirebase } from "../FirebaseProvider";
import { NoteCard } from "../Notes";
import { Typography } from "../Typography";

const LastDiaryEntries = () => {
  const { getNotes } = useFirebase();
  const notes = getNotes();

  return (
    <Card>
      <Typography>Your last diary entries</Typography>
      {notes.slice(0, 2).map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
      {!notes.length && <Typography>No diary</Typography>}
    </Card>
  );
};

export default LastDiaryEntries;
