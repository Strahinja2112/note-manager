import {
  FileData,
  FileOrFolderData,
  FileOrFolderDataFull,
  FolderData,
  NoteInfo
} from "@shared/types";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { create } from "zustand";

type Props = {
  filesAndFolders: FileOrFolderData[];
  selectedNote: FileData | null;
  selectedFolder: FolderData | null;
  setState(state: Partial<Props>): void;
  onCreate(): Promise<void>;
  onDelete(): Promise<void>;
  onNoteSelect(path: string): Promise<void>;
  onSave(markdown: string): Promise<void>;
  onRename(oldTitle: string, newTitle: string): Promise<void>;
  fetchData(): Promise<void>;
};

export const useStore = create<Props>((set, get) => ({
  filesAndFolders: [],
  selectedNote: null,
  selectedFolder: null,
  setState(state: Partial<Props>) {
    set((prev) => ({
      ...prev,
      ...state
    }));
  },
  async onCreate() {
    const oldState = get();

    try {
      const newNote = await window.context.saveNote(null, true);

      if (newNote) {
        set({
          filesAndFolders: [newNote, ...oldState.filesAndFolders],
          selectedNote: newNote
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  async onDelete() {
    const { filesAndFolders, selectedNote } = get();

    if (!selectedNote) {
      return;
    }

    const success = await window.context.deleteNote(selectedNote);

    debugger;

    if (!success) {
      toast.error("Something went wrong!");
      return;
    }

    toast.success("Deleted note!");

    const newNotes = filesAndFolders.filter((note) => note.title !== selectedNote?.title);

    if (newNotes[newNotes.length - 1].type == "file") {
      const newSelected: FileData = {
        ...newNotes[newNotes.length - 1],
        lastEditTime: newNotes[newNotes.length - 1].lastEditTime,
        type: "file",
        content: ""
      };

      const content = await window.context.readNoteData(newSelected.title);

      newSelected.content = content;

      set({
        filesAndFolders: newNotes,
        selectedNote: newSelected
      });

      return;
    }

    set({
      filesAndFolders: newNotes
    });
  },
  async onNoteSelect(path: string) {
    const { filesAndFolders } = get();

    const newSelected = findByPath(filesAndFolders, path);

    if (!newSelected) {
      toast.error("NIJE NASO");
      return;
    }

    const content = await window.context.readNoteData(newSelected.fullPath);

    set({
      selectedNote: {
        ...newSelected,
        type: "file",
        content
      }
    });
  },
  async onSave(markdown: string) {
    const { selectedNote } = get();

    if (!selectedNote) return;

    selectedNote.content = markdown;

    try {
      await window.context.saveNote(selectedNote);
    } catch (error) {
      console.error(error);
    }
  },
  async onRename(oldTitle: string, newTitle: string) {
    const { success, content } = await window.context.renameNote(get().selectedNote, newTitle);
    if (!success) {
      return;
    }

    const oldData = get();
    const oldNote = oldData.filesAndFolders.find((note) => note.title === oldTitle);
    if (!oldNote) {
      return;
    }

    const newNotes = oldData.filesAndFolders.filter((note) => note.title !== oldTitle);

    const selectedNote = {
      ...oldNote,
      title: newTitle
    };

    const oldPathSeparated = selectedNote.fullPath.split("\\");
    oldPathSeparated.pop();

    selectedNote.fullPath = oldPathSeparated.join("\\") + "\\" + newTitle + ".md";

    newNotes.push(selectedNote);

    set({
      filesAndFolders: newNotes,
      selectedNote: {
        type: "file",
        content,
        fullPath: selectedNote.fullPath,
        title: selectedNote.title,
        lastEditTime: selectedNote.lastEditTime
      }
    });
  },
  async fetchData() {
    const notes = await window.context.getNotes();
    set({
      filesAndFolders: notes
    });
  }
}));

export function useNotes() {
  const hasCalled = useRef(false);
  const store = useStore();

  useEffect(() => {
    if (!hasCalled.current) {
      store.fetchData();
    }
  }, []);

  return store;
}

function findByPath(data: FileOrFolderData[], path: string) {
  for (const item of data) {
    if (item.type === "file" && item.fullPath === path) {
      return item;
    } else if (item.type === "folder") {
      const foundNote = findByPath(item.data, path);
      if (foundNote !== null) {
        return foundNote;
      }
    }
  }

  return null;
}
