import { useNotes } from "@renderer/store/useNotes";

export default function NoteTitle() {
  const { selectedNote } = useNotes();

  return (
    <div className="flex pt-2 justify-center">
      <span className="text-gray-400">{selectedNote?.title}</span>
    </div>
  );
}
