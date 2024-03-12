import { deleteNote, getNotes, readNoteData, renameNote, saveNote } from "src/main/lib";

export type TNoteInfo = {
  title: string;
  lastEditTime: number;
};

export type TRoute = "editor" | "settings";

export interface IWindowContextAPI {
  locale: string;
  windowActions: {
    close(): void;
    minimize(): void;
    maximize(): void;
  };
  getRootDir: () => Promise<string>;
  openInShell: (path: string) => void;
  getNotes: typeof getNotes;
  readNoteData: typeof readNoteData;
  saveNote: typeof saveNote;
  renameNote: typeof renameNote;
  deleteNote: typeof deleteNote;
}

export type FileData = TNoteInfo & {
  type: "file";
  fullPath: string;
  content?: string;
};

export type FolderData = TNoteInfo & {
  type: "folder";
  title: string;
  fullPath: string;
  data: FileOrFolderData[];
};

export type FileOrFolderData = FileData | FolderData;

export type FileOrFolderDataFull = FileOrFolderData & { content: string };
