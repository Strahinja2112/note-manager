import { FileData, FileOrFolderData, FileOrFolderDataFull, NoteInfo } from "@shared/types";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { create } from "zustand";

type Props = {
  filesAndFolders: FileOrFolderData[];
  selectedNote: FileData | null;
  setState(state: Partial<Props>): void;
  onCreate(): Promise<void>;
  onDelete(): Promise<void>;
  onNoteSelect(path: string): Promise<void>;
  onSave(markdown: string): Promise<void>;
  onRename(oldTitle: string, newTitle: string): Promise<void>;
};

export const useStore = create<Props>((set, get) => ({
  filesAndFolders: [],
  selectedNote: null,
  setState(state: Partial<Props>) {
    set((prev) => ({
      ...prev,
      ...state
    }));
  },
  async onCreate() {
    const oldState = get();

    try {
      const newNote = await window.context.saveNote(
        `Note${oldState.filesAndFolders.length + 1}`,
        "Edit this!",
        true
      );

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
    const newNotes = filesAndFolders.filter((note) => note.title !== selectedNote?.title);

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

    try {
      await window.context.saveNote(selectedNote.title, markdown);
    } catch (error) {
      console.error(error);
    }
  },
  async onRename(oldTitle: string, newTitle: string) {
    const { success, content } = await window.context.renameNote(oldTitle, newTitle);
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

    newNotes.push(selectedNote);

    set({
      filesAndFolders: newNotes,
      selectedNote: {
        type: "file",
        content,
        fullPath: "",
        title: selectedNote.title,
        lastEditTime: selectedNote.lastEditTime
      }
    });
  }
}));

export function useNotes() {
  const hasCalled = useRef(false);
  const store = useStore();

  useEffect(() => {
    async function fetchData() {
      hasCalled.current = true;
      const notes = await window.context.getNotes();

      store.setState({
        filesAndFolders: notes
      });
    }

    if (!hasCalled.current) {
      fetchData();
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
