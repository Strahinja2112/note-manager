import { useNotes } from "@renderer/hooks/useNotes";
import { createEmptyNoteAtom, deleteNoteAtom } from "@renderer/store";
import { cn } from "@renderer/utils";
import { useSetAtom } from "jotai";
import { MoreHorizontal, Plus, Trash } from "lucide-react";
import { ComponentProps } from "react";
import Button from "./Button";
import NotePreview from "./NotePreview";

export default function Sidebar({
  className,
  onSelect,
  ...props
}: ComponentProps<"aside"> & {
  onSelect(): void;
}) {
  const { notes, selectedIdx, handleNotesSelect } = useNotes({});

  const onCreate = useSetAtom(createEmptyNoteAtom);
  const onDelete = useSetAtom(deleteNoteAtom);

  return (
    <aside className="z-[100]" onClick={onSelect} {...props}>
      <div className="w-full flex p-2 items-center justify-between">
        <Button onClick={onCreate}>
          <Plus className="w-5 h-5 text-zinc-300" />
        </Button>
        <Button onClick={onDelete}>
          <Trash className="w-5 h-5 text-zinc-300" />
        </Button>
      </div>
      <div className={cn("w-[270px] h-[100vh] overflow-auto", className)}>
        <ul className="space-y-1 w-full">
          {notes.map((note, idx) => (
            <NotePreview
              onNoteSelect={handleNotesSelect(idx)}
              key={note.title + note.lastEditTime}
              isActive={idx === selectedIdx}
              note={note}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
}

{
  /* <div className="h-8 *:rounded-full flex group w-full items-center gap-2 justify-end pr-2">
  <button className="bg-green-500 w-[20px] h-[20px] flex items-center justify-center">
    <span className="-translate-x-[0.2px] -translate-y-[1px] text-black/60">_</span>
  </button>
  <button className="bg-yellow-500 w-[20px] h-[20px] flex items-center justify-center">
    <span className="-translate-x-[0.2px] -translate-y-[1px] text-black">🗖</span>
  </button>
  <button className="bg-red-500 w-[20px] h-[20px] flex items-center justify-center">
    <X size={16} className="text-black/60" />
  </button>
</div> */
}
