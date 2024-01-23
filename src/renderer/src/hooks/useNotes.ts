import {
  createEmptyNoteAtom,
  deleteNoteAtom,
  notesAtom,
  selectedNoteIndexAtom
} from "@renderer/store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

type Props = {
  onSelect?(): void;
};

export function useNotes({ onSelect }: Props) {
  const notes = useAtomValue(notesAtom);

  const onCreate = useSetAtom(createEmptyNoteAtom);
  const onDelete = useSetAtom(deleteNoteAtom);

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
    handleNotesSelect,
    onCreate,
    onDelete
  };
}
