import { create } from "zustand";

type LocationStore = {
  location: {
    city: string | null;
    region: string | null;
    country: string | null;
    latitude: number;
    longitude: number;
  };
  setLocation: (location: {
    city: string | null;
    region: string | null;
    country: string | null;
    latitude: number;
    longitude: number;
  }) => void;
};

const useLocationStore = create<LocationStore>((set) => ({
  location: { city: "", region: "", country: "", latitude: 0, longitude: 0 },
  setLocation: (location: {
    city: string | null;
    region: string | null;
    country: string | null;
    latitude: number;
    longitude: number;
  }) => set({ location }),
}));

export default useLocationStore;
