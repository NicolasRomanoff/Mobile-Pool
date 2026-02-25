import { Calendar, User } from "lucide-react-native";

const routes = [
  {
    key: "profile",
    title: "Profile",
    icon: (color: string) => <User color={color} size={24} />,
  },
  {
    key: "calendar",
    title: "Calendar",
    icon: (color: string) => <Calendar color={color} size={24} />,
  },
];

export default routes;
