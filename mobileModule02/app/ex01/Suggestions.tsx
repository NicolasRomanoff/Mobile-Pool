import useLocationStore from "@/hooks/locationStore";
import { ComponentProps } from "react";
import { Text, View } from "react-native";
import myStyle from "@/assets/style";

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
> = ({
  suggestions,
  setLocationTmp,
  setIsSuggestionSelected,
  style,
  ...props
}) => {
  const { setLocation, setLocationName } = useLocationStore();
  return (
    <View style={style} {...props}>
      {!suggestions.length && <Text style={myStyle.grayText}>No data ...</Text>}
      {suggestions.map((sug, i) => {
        return (
          <View
            key={i}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              borderWidth: 1,
              padding: 5,
              margin: 1,
            }}
            onTouchStart={() => {
              setLocationName({
                name: `${sug.city || ""} ${sug.region || ""} ${
                  sug.country || ""
                }`,
              });
              setLocation({
                name: `${sug.city || ""} ${sug.region || ""} ${
                  sug.country || ""
                }`,
                latitude: sug.latitude,
                longitude: sug.longitude,
              });
              setLocationTmp("");
              setIsSuggestionSelected(false);
            }}
          >
            <Text style={myStyle.suggestionText}>
              {sug.city ? sug.city : ""}
              {((sug.city && sug.country) || (sug.city && sug.region)) && ", "}
              {sug.region && (
                <Text style={{ color: "gray" }}>
                  {sug.region}
                  {sug.region && sug.country && ", "}
                </Text>
              )}
              {sug.country && (
                <Text style={{ color: "gray" }}>{sug.country}</Text>
              )}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Suggestions;
