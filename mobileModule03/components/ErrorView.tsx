import mobileStyles from "@/assets/style";
import useErrorStore from "@/hooks/errorStore";
import { errorDict } from "@/lib/error.const";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "./Typography";

const ErrorView = () => {
  const { error } = useErrorStore();
  return (
    <SafeAreaView style={mobileStyles.container}>
      <Typography size="sm" color="red">
        {errorDict[error]}
      </Typography>
    </SafeAreaView>
  );
};

export default ErrorView;
