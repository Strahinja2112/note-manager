import { TGetNotes } from "@shared/types";

declare global {
  interface Window {
    // electron: ElectronAPI;
    context: {
      locale: navigator.language;
      getNotes: TGetNotes;
      windowActions: {
        close(): void;
        minimize(): void;
        maximize(): void;
      };
    };
  }
}
