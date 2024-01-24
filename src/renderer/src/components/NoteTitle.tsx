import { useNotes } from "@renderer/store/useNotes";

export default function NoteTitle() {
  const { selectedNote } = useNotes();

  return (
    <div className="flex sticky top-0 inset-0 bg-zinc-900 h-[55px] border-b items-center justify-center">
      <span className="text-gray-200 text-2xl">{selectedNote?.title}</span>
    </div>
  );
}
