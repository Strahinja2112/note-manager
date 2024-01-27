import { Accordion } from "@/components/ui/accordion";
import { useNotes } from "@renderer/hooks/useNotes";
import { cn } from "@renderer/utils";
import { ComponentProps, useEffect, useState } from "react";
import FileFolderTree from "./FileFolderTree";
import OptionsTab from "./OptionsTab";
import Titlebar from "./Titlebar";

export default function Sidebar({
  className,
  onSelect,
  ...props
}: ComponentProps<"aside"> & {
  onSelect(): void;
}) {
  const { filesAndFolders, setState } = useNotes();

  const [cwd, setCwd] = useState("Loading...");

  useEffect(() => {
    (async () => {
      const cwd = await window.context.getRootDir();
      setCwd(cwd);
    })();
  }, []);

  return (
    <aside
      className="z-[100] h-[100vh] bg-secondary border-l rounded-none"
      onClick={() => {
        onSelect();
        setState({
          selectedFolder: null,
          selectedNote: null
        });
      }}
      {...props}
    >
      <Titlebar />
      <div className="w-full text-xs border-b h-[23px] flex items-center pl-2 text-muted-foreground">
        <button
          onClick={() => window.context.openInShell(cwd)}
          className="transition max-w-[270px] hover:text-white hover:underline line-clamp-1 overflow-hidden"
        >
          {cwd}
        </button>
      </div>
      <div className={cn("w-[270px] flex-1 h-[calc(100vh-90px)] overflow-auto", className)}>
        <Accordion type="multiple" className="w-full flex flex-col gap-1">
          <FileFolderTree data={filesAndFolders} folderPath="" />
        </Accordion>
      </div>
      <OptionsTab />
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
