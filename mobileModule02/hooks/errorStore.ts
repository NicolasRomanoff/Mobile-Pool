import type { TErrorDict } from "@/lib/error.const";
import { create } from "zustand";

type ErrorStore = {
  error: {
    hasError: boolean;
    type: TErrorDict;
  };
  setError: (error: { hasError: boolean; type: TErrorDict }) => void;
};

const useErrorStore = create<ErrorStore>((set) => ({
  error: { hasError: false, type: "undefined" },
  setError: (error: { hasError: boolean; type: TErrorDict }) => set({ error }),
}));

export default useErrorStore;
