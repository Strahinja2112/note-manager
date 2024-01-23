import { getAllNotes } from "src/main/lib";

export interface INoteInfo {
  title: string;
  lastEditTime: number;
}

export type GetAllNotes = typeof getAllNotes;
