import { blue, green, grey, red, yellow } from "@/assets/style";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Angry, Annoyed, Laugh, Meh, Smile } from "lucide-react-native";

export const providers = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
};
export type TProvider = keyof typeof providers;

export const feelingsIcon = {
  happy: <Laugh color={blue} size={40} />,
  satisfied: <Smile color={yellow} size={40} />,
  mid: <Meh color={grey} size={40} />,
  annoyed: <Annoyed color={green} size={40} />,
  angry: <Angry color={red} size={40} />,
};
export type TFeeling = keyof typeof feelingsIcon;

export type TNote = {
  id: string;
  date: string;
  icon: TFeeling;
  text: string;
  title: string;
  usermail: string;
};

export type TEntryNote = Omit<TNote, "id" | "date" | "usermail">;

export const dateFormat = "d MMMM yyyy 'à' HH:mm:ss 'UTC'XXX";
