import { selectedNoteAtom } from "@renderer/store";
import { useAtomValue } from "jotai";

export default function useMarkdownEditor() {
  const selectedNote = useAtomValue(selectedNoteAtom);

  return {
    selectedNote
  };
}
