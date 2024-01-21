import { notesAtom, selectedNoteIndexAtom } from "@renderer/store";
import { useAtom, useAtomValue } from "jotai";

type Props = {
  onSelect?(): void;
};

export function useNotes({ onSelect }: Props) {
  const notes = useAtomValue(notesAtom);

  const [selectedIdx, setSelectedIdx] = useAtom(selectedNoteIndexAtom);

  function handleNotesSelect(index: number) {
    return async () => {
      setSelectedIdx(index);
      onSelect?.();
    };
  }

  return {
    notes,
    selectedIdx,
    handleNotesSelect
  };
}
