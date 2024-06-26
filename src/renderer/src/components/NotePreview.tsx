import { cn, formatDateFromMs } from "@renderer/utils";
import type { NoteInfo } from "@shared/types";
import { FileCode2 } from "lucide-react";
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
      onClick={(e) => {
        e.stopPropagation();

        onNoteSelect();
      }}
      className={cn(
        "w-full transition cursor-pointer p-1 px-2 gap-1 flex justify-between items-center",
        isActive && "bg-zinc-900/50",
        className
      )}
      style={{
        paddingLeft: level > 0 ? level * 10 + 16 + "px" : "16px"
      }}
      {...props}
    >
      <div className="flex items-centerjustify-center gap-2">
        <FileCode2 className="h-3.5 w-3.5 translate-y-0.5 shrink-0 transition duration-200" />
        <h3 className="text-sm line-clamp-1">{note.title}.md</h3>
      </div>
      <span className="inline-block text-[#b5b5b5] text-end min-w-[40%] text-[10px]">
        {formatDateFromMs(note.lastEditTime)}
      </span>
    </li>
  );
}
