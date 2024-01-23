import { TGetNotes, TReadNoteData } from "@shared/types";

declare global {
  interface Window {
    // electron: ElectronAPI;
    context: {
      locale: navigator.language;
      windowActions: {
        close(): void;
        minimize(): void;
        maximize(): void;
      };
      getNotes: TGetNotes;
      readNoteData: TReadNoteData;
    };
  }
}
