import { TGetNotes, TReadNoteData, TSaveNote } from "@shared/types";
import { WindowContextAPI } from "../shared/types";

declare global {
  interface Window {
    context: WindowContextAPI;
  }
}
