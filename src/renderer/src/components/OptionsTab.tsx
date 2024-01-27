import { useNotes } from "@renderer/hooks/useNotes";
import { FilePlus, FolderPlus, PlusIcon, RotateCcw, Settings, Trash } from "lucide-react";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useLocation } from "@renderer/hooks/useLocation";

type Props = {};

export default function OptionsTab({}: Props) {
  const { selectedNote, onCreate, onDelete, fetchData } = useNotes();
  const { setLocation } = useLocation();

  return (
    <div
      className="w-full h-[35px] border-t flex items-center justify-between px-1"
      onClick={(e) => e.stopPropagation}
    >
      <div className="flex items-center justify-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="mini">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[120px] z-[100] bg-secondary">
            <DropdownMenuItem onClick={onCreate}>
              <FilePlus className="h-4 w-4 mr-2" />
              New File
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={onDelete} size="mini" disabled={!selectedNote}>
          <Trash className="w-4 h-4 text-zinc-300" />
        </Button>
      </div>
      <span className="text-white/80">Options</span>
      <div className="flex items-center justify-center gap-1">
        <Button size="mini" onClick={() => setLocation("settings")}>
          <Settings className="w-4 h-4" />
        </Button>
        <Button size="mini" onClick={fetchData}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
