import { cn, formatDateFromMs } from "@renderer/utils";
import type { NoteInfo } from "@shared/types";
import { File, FileArchive } from "lucide-react";
import { ComponentProps } from "react";

type Props = {
  note: NoteInfo;
  isActive?: boolean;
  level: number;
  onNoteSelect(): void;
};

export default function NotePreview({
  note,
  isActive,
  className,
  level,
  onNoteSelect,
  ...props
}: ComponentProps<"li"> & Props) {
  return (
    <li
      onClick={() => onNoteSelect()}
      className={cn(
        "w-full transition cursor-pointer p-1 px-2 gap-1 flex justify-between items-center",
        isActive && "bg-zinc-900/50",
        className
      )}
      style={{
        paddingLeft: level * 15 + "px"
      }}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <FileArchive className="h-3.5 w-3.5 shrink-0 transition duration-200" />
        <h3 className="text-sm truncate">{note.title}.md</h3>
      </div>
      <span className="inline-block text-[#b5b5b5] text-[10px]">
        {formatDateFromMs(note.lastEditTime)}
      </span>
    </li>
  );
}
