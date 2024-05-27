import { PossibleLocations } from "@shared/types";
import { create } from "zustand";

type TLocation = {
  location: PossibleLocations;
  setLocation(newLocation: PossibleLocations): void;
};

export const useLocation = create<TLocation>((set) => ({
  location: "main",
  setLocation(newLocation) {
    set({
      location: newLocation
    });
  }
}));
