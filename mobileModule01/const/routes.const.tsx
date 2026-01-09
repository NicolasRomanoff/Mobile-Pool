import { Calendar, CalendarDays, Sun } from "lucide-react-native";

export const routes = [
  {
    key: "currently",
    title: "Currently",
    icon: (color: string) => <Sun color={color} size={24} />,
  },
  {
    key: "today",
    title: "Today",
    icon: (color: string) => <Calendar color={color} size={24} />,
  },
  {
    key: "weekly",
    title: "Weekly",
    icon: (color: string) => <CalendarDays color={color} size={24} />,
  },
];
