import { cn } from "@renderer/utils";
import { mocks } from "@shared/constants";
import { Plus, Trash } from "lucide-react";
import { ComponentProps } from "react";
import Button from "./Button";
import NotePreview from "./NotePreview";

export default function Sidebar({ className, ...props }: ComponentProps<"aside">) {
  return (
    <aside className="z-[100]" {...props}>
      <div className="w-full flex p-2 items-center justify-between">
        <Button>
          <Plus className="w-5 h-5 text-zinc-300" />
        </Button>
        <Button>
          <Trash className="w-5 h-5 text-zinc-300" />
        </Button>
      </div>
      <div className={cn("w-[250px] h-[100vh + 10px] overflow-auto", className)}>
        <ul className="space-y-1">
          {mocks.map((note, idx) => (
            <NotePreview key={note.title + note.lastEditTime} isActive={idx === 1} note={note} />
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
