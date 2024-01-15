import { cn, formatDateFromMs } from "@renderer/utils";
import type { INoteInfo } from "@shared/types";

type Props = {
  note: INoteInfo;
  isActive?: boolean;
};

export default function NotePreview({ note, isActive }: Props) {
  return (
    <li
      className={cn(
        "w-full border transition cursor-pointer hover:bg-white/10 border-zinc-900 rounded-lg p-2 gap-2 flex flex-col",
        isActive && "bg-white/5 border-zinc-800"
      )}
    >
      <h3 className="text-xl mb-1 font-bold truncate">{note.title}</h3>
      <span className="inline-block w-full mb-2 text-xs font-light">
        {formatDateFromMs(note.lastEditTime)}
      </span>
    </li>
  );
}
