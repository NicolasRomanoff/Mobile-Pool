import { create } from "zustand";

export type TLocation = {
  city: string;
  region: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
};

type LocationStore = {
  location: TLocation;
  setLocation: (location: TLocation) => void;
  finded: boolean;
  setFinded: (finded: boolean) => void;
};

const useLocationStore = create<LocationStore>((set) => ({
  location: {
    city: "",
    region: "",
    country: "",
    latitude: null,
    longitude: null,
  },
  setLocation: (location: TLocation) => set({ location }),
  finded: false,
  setFinded: (finded: boolean) => set({ finded }),
}));

export default useLocationStore;
