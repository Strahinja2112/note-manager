import { mockNotes } from "@shared/constants";
import { INoteInfo } from "@shared/types";
import { atom } from "jotai";

export const notesAtom = atom<INoteInfo[]>(mockNotes);

export const selectedNoteIndexAtom = atom<number | null>(null);

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom);
  const selectedIdx = get(selectedNoteIndexAtom);

  if (selectedIdx === null) {
    return null;
  }

  const selectedNote = notes[selectedIdx];

  return {
    ...selectedNote,
    content: `Hello from the #${selectedIdx} note!`
  };
});

export const createEmptyNoteAtom = atom(null, (get, set) => {
  const allNotes = get(notesAtom);

  const newNote: INoteInfo = {
    title: `Note ${allNotes.length + 1}`,
    lastEditTime: new Date().getTime()
  };

  set(notesAtom, [newNote, ...allNotes.filter((note) => note.title !== newNote.title)]);

  set(selectedNoteIndexAtom, 0);
});

export const deleteNoteAtom = atom(null, (get, set) => {
  const allNotes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);

  if (!selectedNote) {
    return;
  }

  set(
    notesAtom,
    allNotes.filter((note) => note.title !== selectedNote.title)
  );

  set(selectedNoteIndexAtom, null);
});
