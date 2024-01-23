import { INoteInfo } from "@shared/types";
import { useEffect, useRef, useState } from "react";
import { create } from "zustand";

type TNoteInfoFull = INoteInfo & { content: string };

type Props = {
  notes: INoteInfo[];
  selectedNote: TNoteInfoFull | null;
  setState(state: Partial<Props>): void;
  onCreate(): void;
  onDelete(): Promise<void>;
  onNoteSelect(idx: number): Promise<void>;
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
  onCreate() {
    const oldState = get();

    const newNote: TNoteInfoFull = {
      title: `Note${oldState.notes.length + 1}`,
      lastEditTime: new Date().getTime(),
      content: "Edit this!"
    };

    set({
      notes: [newNote, ...oldState.notes],
      selectedNote: newNote
    });
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
        selectedNote: { ...notes[0], content }
      });
    }

    if (!hasCalled.current) {
      fetchData();
    }
  }, []);

  console.log(hasCalled.current);

  return store;
}
