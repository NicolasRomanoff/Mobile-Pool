import { black, white } from "@/assets/style";
import { feelingsIcon, TFeeling } from "@/utils/const";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "./Button";

const FeelingSelector: React.FC<{
  feeling: TFeeling;
  setFeeling: (feeling: TFeeling) => void;
}> = ({ feeling, setFeeling }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        {feelingsIcon[feeling]}
      </Button>
      {isOpen && (
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            backgroundColor: black,
            gap: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: white,
            top: 45,
            width: 244,
          }}
        >
          {Object.entries(feelingsIcon).map(([name, icon]) => {
            return (
              <Button
                key={name}
                variant="ghost"
                onClick={() => {
                  setFeeling(name as TFeeling);
                  setIsOpen(false);
                }}
              >
                {icon}
              </Button>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default FeelingSelector;
