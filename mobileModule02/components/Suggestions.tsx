import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { ComponentProps } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Typography } from "./Typography";

const Suggestions: React.FC<
  {
    suggestions: {
      city: string;
      region: string;
      country: string;
      latitude: number;
      longitude: number;
    }[];
    setLocationTmp: React.Dispatch<React.SetStateAction<string>>;
    setIsSuggestionSelected: React.Dispatch<React.SetStateAction<boolean>>;
  } & ComponentProps<typeof View>
> = ({ suggestions, setLocationTmp, setIsSuggestionSelected, ...props }) => {
  const { setLocation } = useLocationStore();
  const { setError } = useErrorStore();

  return (
    <View {...props}>
      {!suggestions.length && (
        <Typography size="sm" color="black">
          No data ...
        </Typography>
      )}
      {suggestions.map((sug, i) => {
        return (
          <TouchableOpacity
            key={i}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              padding: 5,
              margin: 1,
            }}
            onPress={() => {
              setError({ hasError: false, type: "undefined" });
              setLocation({ ...sug });
              setLocationTmp("");
              setIsSuggestionSelected(false);
            }}
          >
            <Typography size="sm">
              {Object.entries(sug)
                .filter(
                  ([key, value]) =>
                    ["city", "region", "country"].includes(key) && value
                )
                .map(([key, value], index) => (
                  <Text key={index} style={{ color: index ? "gray" : "black" }}>
                    {(index ? ", " : "") + value}
                  </Text>
                ))}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Suggestions;
