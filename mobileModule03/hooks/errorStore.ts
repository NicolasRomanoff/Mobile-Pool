import { errorDict } from "@/lib/utils";
import { create } from "zustand";

type ErrorStore = {
  error: {
    hasError: boolean;
    type: keyof typeof errorDict;
  };
  setError: (error: {
    hasError: boolean;
    type: keyof typeof errorDict;
  }) => void;
};

const useErrorStore = create<ErrorStore>((set) => ({
  error: { hasError: false, type: "undefined" },
  setError: (error: { hasError: boolean; type: keyof typeof errorDict }) =>
    set({ error }),
}));

export default useErrorStore;
