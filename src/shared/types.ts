import { getNotes } from "src/main/lib";

export interface INoteInfo {
  title: string;
  lastEditTime: number;
}

export type TGetNotes = typeof getNotes;
