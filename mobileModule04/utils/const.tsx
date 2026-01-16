import { blue, green, grey, red, yellow } from "@/assets/style";
import { FieldValue } from "firebase/firestore";
import { Angry, Annoyed, Laugh, Meh, Smile } from "lucide-react-native";

export const feelingsIcon = {
  happy: <Laugh color={blue} size={40} />,
  satisfied: <Smile color={yellow} size={40} />,
  mid: <Meh color={grey} size={40} />,
  annoyed: <Annoyed color={green} size={40} />,
  angry: <Angry color={red} size={40} />,
};
export type TFeeling = keyof typeof feelingsIcon;

export type TNote = {
  date: FieldValue;
  icon: TFeeling;
  text: string;
  title: string;
  usermail: string;
};
