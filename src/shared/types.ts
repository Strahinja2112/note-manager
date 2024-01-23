import { getNotes, readNoteData, saveNote } from "src/main/lib";

export interface INoteInfo {
  title: string;
  lastEditTime: number;
}

export type TGetNotes = typeof getNotes;
export type TReadNoteData = typeof readNoteData;
export type TSaveNote = typeof saveNote;

export type WindowContextAPI = {
  locale: string;
  windowActions: {
    close(): void;
    minimize(): void;
    maximize(): void;
  };
  getNotes: TGetNotes;
  readNoteData: TReadNoteData;
  saveNote: TSaveNote;
};
