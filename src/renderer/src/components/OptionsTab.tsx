import { useNotes } from "@renderer/store/useNotes";
import { File, Folder, Plus, RotateCcw, Settings, Trash } from "lucide-react";
import { Button } from "./ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {};

export default function OptionsTab({}: Props) {
  const { selectedNote, onCreate, onDelete, fetchData } = useNotes();

  return (
    <div className="w-full h-[35px] border-t flex items-center justify-between px-1">
      <div className="flex items-center justify-center gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button size="mini">
              <Plus className="w-5 h-5 text-zinc-300" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-[100] flex flex-col p-1 w-[100px] bg-secondary drop-shadow-lg gap-1 text-muted-foreground">
            <span className="text-center text-sm">Add new: </span>
            <Button
              size="mini"
              className="flex justify-between"
              style={{
                paddingInline: "12px"
              }}
            >
              <Folder className="w-5 h-5 text-zinc-300" />
              Folder
            </Button>
            <Button
              size="mini"
              style={{
                padding: "12px"
              }}
              onClick={onCreate}
            >
              <File className="w-5 h-5 text-zinc-300" />
              Note
            </Button>
          </PopoverContent>
        </Popover>
        <Button onClick={onDelete} size="mini" disabled={!selectedNote}>
          <Trash className="w-4 h-4 text-zinc-300" />
        </Button>
      </div>
      <span className="text-white/80">Options</span>
      <div className="flex items-center justify-center gap-1">
        <Button size="mini">
          <Settings className="w-4 h-4" />
        </Button>
        <Button size="mini" onClick={fetchData}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
