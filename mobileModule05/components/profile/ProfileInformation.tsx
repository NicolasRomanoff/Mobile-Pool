import { LogOut } from "lucide-react-native";
import { Image, View } from "react-native";
import { Button } from "../Button";
import { useFirebase } from "../FirebaseProvider";
import { Typography } from "../Typography";

const ProfileInformation = () => {
  const { user, logOut } = useFirebase();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        paddingHorizontal: 10,
      }}
    >
      <Image
        style={{ width: 100, height: 100 }}
        defaultSource={require("@/assets/images/user_icon.png")}
        source={{
          uri: user?.photoURL ?? require("@/assets/images/user_icon.png"),
        }}
      />
      <View style={{ flex: 1 }}>
        <Typography numberOfLines={2}>{user?.displayName}</Typography>
      </View>
      <Button variant="ghost" onClick={logOut}>
        <Typography color="yellow">
          <LogOut />
        </Typography>
      </Button>
    </View>
  );
};

export default ProfileInformation;
