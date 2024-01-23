import { useNotes } from "@renderer/store/useNotes";

export default function NoteTitle() {
  const { selectedNote } = useNotes();

  return (
    <div className="flex sticky top-0 inset-0 h-8 backdrop-blur-lg border-b pt-1 justify-center">
      <span className="text-gray-200">{selectedNote?.title}</span>
    </div>
  );
}
