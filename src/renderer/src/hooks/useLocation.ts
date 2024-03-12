import { TRoute } from "@shared/types";
import { create } from "zustand";

export const useLocation = create<{
  location: TRoute;
  setLocation(newLocation: TRoute): void;
}>((set) => ({
  location: "editor",
  setLocation(newLocation) {
    set({
      location: newLocation
    });
  }
}));
