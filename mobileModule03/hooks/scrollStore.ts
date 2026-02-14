import { create } from "zustand";

type ScrollStore = {
  isSwipeEnabled: boolean;
  setIsSwipeEnabled: (finded: boolean) => void;
};

const useScrollStore = create<ScrollStore>((set) => ({
  isSwipeEnabled: false,
  setIsSwipeEnabled: (isScroll: boolean) => set({ isSwipeEnabled: isScroll }),
}));

export default useScrollStore;
