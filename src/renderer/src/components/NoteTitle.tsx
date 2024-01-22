import { selectedNoteAtom } from "@renderer/store";
import { useAtomValue } from "jotai";

type Props = {};

export default function NoteTitle({}: Props) {
  const selectedNote = useAtomValue(selectedNoteAtom);

  console.log({ selectedNote });

  return (
    <div className="flex pt-2 justify-center">
      <span className="text-gray-400">{selectedNote?.title}</span>
    </div>
  );
}
