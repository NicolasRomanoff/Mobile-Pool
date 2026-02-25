import TabBar from "@/components/TabBar";
import routes from "@/utils/routes.const";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import Calendar from "./tabs/calendar";
import Profile from "./tabs/profile";

const renderScene = SceneMap({
  profile: Profile,
  calendar: Calendar,
});

const Diary = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition={"bottom"}
      renderTabBar={(props) => <TabBar {...props} />}
    />
  );
};

export default Diary;
