import TabBar from "@/components/ex00/TabBar";
import { routes } from "@/const/routes.const";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import Currently from "./tabs/currently";
import Today from "./tabs/today";
import Weekly from "./tabs/weekly";

const renderScene = SceneMap({
  currently: Currently,
  today: Today,
  weekly: Weekly,
});

const Ex00 = () => {
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

export default Ex00;
