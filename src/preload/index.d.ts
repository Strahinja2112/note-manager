import { TGetNotes, TReadNoteData, TSaveNote } from "@shared/types";
import { IWindowContextAPI } from "../shared/types";

declare global {
  interface Window {
    context: IWindowContextAPI;
  }
}
