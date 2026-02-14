import useScrollStore from "@/hooks/scrollStore";
import { ComponentProps } from "react";
import { FlatList } from "react-native";

const ScrollSafeFlatList = <T,>({
  ...props
}: ComponentProps<typeof FlatList<T>>) => {
  const { setIsSwipeEnabled } = useScrollStore();

  return (
    <FlatList
      {...props}
      onTouchStart={() => setIsSwipeEnabled(true)}
      onTouchEnd={() => setIsSwipeEnabled(false)}
    />
  );
};

export default ScrollSafeFlatList;
