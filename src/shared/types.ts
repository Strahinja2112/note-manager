import { getNotes, readNoteData, renameNote, saveNote } from "src/main/lib";

export type NoteInfo = {
  title: string;
  lastEditTime: number;
};

export type TGetNotes = typeof getNotes;
export type TReadNoteData = typeof readNoteData;
export type TSaveNote = typeof saveNote;
export type TRenameNote = typeof renameNote;

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
  renameNote: TRenameNote;
};

export type FileData = NoteInfo & {
  type: "file";
  fullPath: string;
  content?: string;
};

export type FolderData = NoteInfo & {
  type: "folder";
  title: string;
  fullPath: string;
  data: FileOrFolderData[];
};

export type FileOrFolderData = FileData | FolderData;

export type FileOrFolderDataFull = FileOrFolderData & { content: string };
