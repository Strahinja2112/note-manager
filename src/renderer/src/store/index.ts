import { mocks } from "@shared/constants";
import { INoteInfo } from "@shared/types";
import { atom } from "jotai";

export const notesAtom = atom<INoteInfo[]>(mocks);

export const selectedNoteIndexAtom = atom<number | null>(null);

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom);
  const selectedIdx = get(selectedNoteIndexAtom);

  if (!selectedIdx) {
    return null;
  }

  const selectedNote = notes[selectedIdx];

  return {
    ...selectedNote,
    content: `Hello from the #${selectedIdx} note!`
  };
});
