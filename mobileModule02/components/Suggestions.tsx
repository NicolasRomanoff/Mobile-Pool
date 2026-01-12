import mobileStyles from "@/assets/style";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore, { TLocation } from "@/hooks/locationStore";
import { ComponentProps } from "react";
import { Text, View } from "react-native";
import { Button } from "./Button";
import { Typography } from "./Typography";

const Suggestions: React.FC<
  ComponentProps<typeof View> & {
    suggestions: TLocation[];
    setSuggestions: React.Dispatch<React.SetStateAction<TLocation[]>>;
    setLocationTmp: React.Dispatch<React.SetStateAction<string>>;
  }
> = ({ suggestions, setSuggestions, setLocationTmp, style, ...props }) => {
  const { setLocation } = useLocationStore();
  const { setError } = useErrorStore();

  return (
    <View style={[mobileStyles.suggestion, style]} {...props}>
      {suggestions.map((suggestion, i) => {
        return (
          <Button
            key={i}
            variant="ghost"
            style={{ padding: 5 }}
            onClick={() => {
              setLocationTmp("");
              setError("");
              setLocation(suggestion);
              setSuggestions([]);
            }}
          >
            <Text>
              {Object.entries(suggestion)
                .filter(
                  ([key, value]) =>
                    ["city", "region", "country"].includes(key) && value
                )
                .map(([_, value], index) => (
                  <Typography
                    key={index}
                    color={index ? "grey" : "black"}
                    size="xs"
                  >
                    {(index ? ", " : "") + value}
                  </Typography>
                ))}
            </Text>
          </Button>
        );
      })}
    </View>
  );
};

export default Suggestions;
