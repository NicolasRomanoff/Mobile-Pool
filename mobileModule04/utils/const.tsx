import { FieldValue } from "firebase/firestore";
import { Angry, Annoyed, Laugh, Meh, Smile } from "lucide-react-native";

export const feelingsIcon = {
  happy: <Laugh />,
  satisfied: <Smile />,
  mid: <Meh />,
  annoyed: <Annoyed />,
  angry: <Angry />,
};
export type TFeeling = keyof typeof feelingsIcon;

export type TNote = {
  date: FieldValue;
  icon: TFeeling;
  text: string;
  title: string;
  usermail: string;
};
