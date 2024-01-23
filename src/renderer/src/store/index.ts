import { INoteInfo } from "@shared/types";
import { atom } from "jotai";
import { unwrap } from "jotai/utils";

async function loadNotes() {
  try {
    const allNotes = await window.context.getNotes();
    console.log(allNotes);

    return allNotes.sort((a, b) => b.lastEditTime - a.lastEditTime);
  } catch (error) {
    console.error(error);
    return [];
  }
}

const notesAtomAsync = atom<INoteInfo[] | Promise<INoteInfo[]>>(loadNotes());

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev);

export const selectedNoteIndexAtom = atom<number | null>(null);

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom);
  const selectedIdx = get(selectedNoteIndexAtom);

  if (selectedIdx === null || !notes) {
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

  if (!allNotes) {
    return;
  }

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

  if (!selectedNote || !allNotes) {
    return;
  }

  set(
    notesAtom,
    allNotes.filter((note) => note.title !== selectedNote.title)
  );

  set(selectedNoteIndexAtom, null);
});
