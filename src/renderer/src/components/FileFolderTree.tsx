import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { useNotes } from "@renderer/store/useNotes";
import { cn } from "@renderer/utils";
import { FileOrFolderData } from "@shared/types";
import { Folder, Plus, Trash } from "lucide-react";
import React, { ComponentProps } from "react";
import NotePreview from "./NotePreview";
import Titlebar from "./Titlebar";
import { Button } from "./ui/button";
type Props = {
  data: FileOrFolderData[];
  level?: number;
};

export default function FileFolderTree({ data, level = 0 }: Props) {
  const { selectedNote, onNoteSelect } = useNotes();

  return (
    <div>
      {data?.map((fileOrFolder) => {
        if (fileOrFolder.type === "file") {
          return (
            <NotePreview
              level={level}
              onNoteSelect={() => onNoteSelect(fileOrFolder.fullPath)}
              key={fileOrFolder.title + fileOrFolder.lastEditTime}
              isActive={fileOrFolder.title === selectedNote?.title}
              note={fileOrFolder}
            />
          );
        }

        return (
          <AccordionItem value={fileOrFolder.fullPath} level={level}>
            <AccordionTrigger
              className="px-1"
              style={{
                paddingLeft: level * 10 + "px"
              }}
            >
              <span>{fileOrFolder.title}</span>
            </AccordionTrigger>
            <AccordionContent>
              <FileFolderTree data={fileOrFolder.data} level={level + 1} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </div>
  );
}
