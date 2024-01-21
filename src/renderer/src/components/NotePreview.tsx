import { cn, formatDateFromMs } from "@renderer/utils";
import type { INoteInfo } from "@shared/types";
import { ComponentProps } from "react";

type Props = {
  note: INoteInfo;
  isActive?: boolean;
  onNoteSelect(): void;
};

export default function NotePreview({
  note,
  isActive,
  onNoteSelect,
  ...props
}: ComponentProps<"li"> & Props) {
  return (
    <li
      onClick={() => {
        onNoteSelect();
        // activeNote.setNote(note);
      }}
      className={cn(
        "w-full transition bg-zinc-900/40 cursor-pointer hover:bg-white/10 rounded-lg p-2 gap-2 flex flex-col",
        isActive && "bg-zinc-800/60"
      )}
      {...props}
    >
      <h3 className="text-xl mb-1 font-bold truncate">{note.title}</h3>
      <span className="inline-block w-full mb-2 text-xs font-light">
        {formatDateFromMs(note.lastEditTime)}
      </span>
    </li>
  );
}
