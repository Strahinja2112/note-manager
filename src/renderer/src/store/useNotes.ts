import { NoteInfo } from "@shared/types";
import { useEffect, useRef, useState } from "react";
import { create } from "zustand";

type TNoteInfoFull = NoteInfo & { content: string };

type Props = {
  notes: NoteInfo[];
  selectedNote: TNoteInfoFull | null;
  setState(state: Partial<Props>): void;
  onCreate(): Promise<void>;
  onDelete(): Promise<void>;
  onNoteSelect(idx: number): Promise<void>;
  onSave(markdown: string): Promise<void>;
  onRename(oldTitle: string, newTitle: string): Promise<void>;
};

export const useStore = create<Props>((set, get) => ({
  notes: [],
  selectedNote: null,
  setState(state: Partial<Props>) {
    set((prev) => ({
      ...prev,
      ...state
    }));
  },
  async onCreate() {
    const oldState = get();

    const newNote: TNoteInfoFull = {
      title: `Note${oldState.notes.length + 1}`,
      lastEditTime: new Date().getTime(),
      content: "Edit this!"
    };

    try {
      await window.context.saveNote(newNote.title, newNote.content);

      set({
        notes: [newNote, ...oldState.notes],
        selectedNote: newNote
      });
    } catch (error) {
      console.error(error);
    }
  },
  async onDelete() {
    const { notes, selectedNote } = get();
    const newNotes = notes.filter((note) => note.title !== selectedNote?.title);

    const newSelected: TNoteInfoFull = {
      ...newNotes[newNotes.length - 1],
      content: ""
    };

    const content = await window.context.readNoteData(newSelected.title);

    newSelected.content = content;

    set({
      notes: newNotes,
      selectedNote: newSelected
    });
  },
  async onNoteSelect(idx: number) {
    const { notes } = get();

    const newSelected = notes[idx];

    const content = await window.context.readNoteData(newSelected.title);

    set({
      selectedNote: {
        ...newSelected,
        content
      }
    });
  },
  async onSave(markdown: string) {
    debugger;
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
    const oldNote = oldData.notes.find((note) => note.title === oldTitle);
    if (!oldNote) {
      return;
    }

    const newNotes = oldData.notes.filter((note) => note.title !== oldTitle);

    const selectedNote = {
      ...oldNote,
      title: newTitle
    };

    newNotes.push(selectedNote);

    set({
      notes: newNotes,
      selectedNote: {
        content,
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
      const content = await window.context.readNoteData(notes[0].title);

      store.setState({
        notes,
        selectedNote: {
          ...notes[0],
          content
        }
      });
    }

    if (!hasCalled.current) {
      fetchData();
    }
  }, []);

  return store;
}
