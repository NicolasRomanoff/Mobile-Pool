import { black } from "@/assets/style";
import {
  ModalProps,
  Modal as NativeModal,
  Pressable,
  View,
} from "react-native";

const Modal: React.FC<
  ModalProps & {
    isModalVisible: boolean;
    setIsModalVisible: (isModalVisible: boolean) => void;
  }
> = ({ isModalVisible, setIsModalVisible, children, ...props }) => {
  return (
    <NativeModal
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(!isModalVisible)}
      transparent={true}
      {...props}
    >
      <Pressable
        style={{
          position: "absolute",
          backgroundColor: `${black}CC`,
          width: "100%",
          height: "100%",
        }}
        onPress={() => setIsModalVisible(false)}
      />
      <View
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "80%",
          height: "80%",
          backgroundColor: black,
          padding: 30,
          gap: 10,
        }}
      >
        {children}
      </View>
    </NativeModal>
  );
};

export default Modal;
