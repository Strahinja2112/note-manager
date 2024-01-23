import { getNotes, readNoteData } from "src/main/lib";

export interface INoteInfo {
  title: string;
  lastEditTime: number;
}

export type TGetNotes = typeof getNotes;
export type TReadNoteData = typeof readNoteData;
