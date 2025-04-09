import { create } from "zustand";

type LocationStore = {
  location: { name: string; latitude: number; longitude: number };
  setLocation: (location: {
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
  setLocationName: (location: { name: string }) => void;
  finded: boolean;
  setFinded: (finded: boolean) => void;
};

const useLocationStore = create<LocationStore>((set) => ({
  location: { name: "", latitude: 0, longitude: 0 },
  setLocation: (location: {
    name: string;
    latitude: number;
    longitude: number;
  }) => set({ location }),
  setLocationName: (location: { name: string }) =>
    set((prev) => ({
      location: {
        ...prev.location,
        name: location.name,
      },
    })),
  finded: false,
  setFinded: (finded: boolean) => set({ finded }),
}));

export default useLocationStore;
