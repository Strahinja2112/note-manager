import { Accordion } from "@/components/ui/accordion";
import { useNotes } from "@renderer/store/useNotes";
import { cn } from "@renderer/utils";
import { Plus, Trash } from "lucide-react";
import { ComponentProps } from "react";
import FileFolderTree from "./FileFolderTree";
import Titlebar from "./Titlebar";
import { Button } from "./ui/button";

export default function Sidebar({
  className,
  onSelect,
  ...props
}: ComponentProps<"aside"> & {
  onSelect(): void;
}) {
  const { filesAndFolders, onCreate, onDelete } = useNotes();

  return (
    <aside className="z-[100] h-[100vh] border-l rounded-none" onClick={onSelect} {...props}>
      <Titlebar />
      <div className="h-[23px] border-b"></div>
      <div className={cn("w-[270px] flex-1 h-[calc(100vh-80px-22px)] overflow-auto", className)}>
        <Accordion type="multiple" className="w-full flex flex-col gap-1">
          <FileFolderTree data={filesAndFolders} />
        </Accordion>
      </div>
      <div className="w-full border-t flex p-2 items-center justify-between">
        <Button onClick={onCreate} size="tiny">
          <Plus className="w-5 h-5 text-zinc-300" />
        </Button>
        <Button onClick={onDelete} size="tiny">
          <Trash className="w-5 h-5 text-zinc-300" />
        </Button>
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
