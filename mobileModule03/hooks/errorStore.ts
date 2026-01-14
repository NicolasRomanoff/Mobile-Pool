import type { TErrorDict } from "@/lib/error.const";
import { create } from "zustand";

type ErrorStore = {
  error: TErrorDict;
  setError: (error: TErrorDict) => void;
};

const useErrorStore = create<ErrorStore>((set) => ({
  error: "",
  setError: (error: TErrorDict) => set({ error }),
}));

export default useErrorStore;
