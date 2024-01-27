import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNotes } from "@renderer/store/useNotes";
import { cn } from "@renderer/utils";
import { FileOrFolderData } from "@shared/types";
import NotePreview from "./NotePreview";
type Props = {
  data: FileOrFolderData[];
  folderPath: string;
  level?: number;
};

export default function FileFolderTree({ data, level = 0 }: Props) {
  const { selectedNote, onNoteSelect, setState, selectedFolder } = useNotes();

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

        const sortedData = fileOrFolder.data.sort((a) => (a.type == "folder" ? -1 : 1));
        return (
          <AccordionItem
            value={fileOrFolder.fullPath}
            key={fileOrFolder.title + fileOrFolder.lastEditTime}
            level={level}
            onClick={(e) => {
              e.stopPropagation();
              setState({
                selectedFolder: fileOrFolder
                // selectedNote: null
              });
            }}
          >
            <AccordionTrigger
              className={cn(
                "px-1",
                fileOrFolder.fullPath === selectedFolder?.fullPath && "bg-zinc-900/50"
              )}
              style={{
                paddingLeft: level * 10 + "px"
              }}
            >
              <span>{fileOrFolder.title}</span>
            </AccordionTrigger>
            <AccordionContent>
              <FileFolderTree
                data={sortedData}
                level={level + 1}
                folderPath={fileOrFolder.fullPath}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </div>
  );
}
