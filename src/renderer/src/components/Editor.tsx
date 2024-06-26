import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from "@mdxeditor/editor";
import { cn } from "@renderer/utils";

import { useNotes } from "@renderer/hooks/useNotes";
import { FileCode2, FileText, PencilIcon, Plus } from "lucide-react";
import NoteTitle from "./NoteTitle";
import Titlebar from "./Titlebar";

export default function Editor({ className }: { className?: string }) {
  const { selectedNote, filesAndFolders, onCreate, onSave } = useNotes();

  return (
    <div
      className={cn(
        "flex-1 overflow-scroll h-screen, rounded-none relative bg-zinc-900/40",
        className
      )}
    >
      {selectedNote ? (
        <>
          <NoteTitle />
          <MDXEditor
            onChange={onSave}
            key={selectedNote.title + selectedNote.lastEditTime}
            markdown={selectedNote.content || ""}
            plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
            contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 pb-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
          />
        </>
      ) : filesAndFolders.length === 0 ? (
        <>
          <Titlebar className="absolute top-0 inset-0" />
          <div className="flex flex-col items-center justify-center h-full">
            <PencilIcon className="h-16 w-16 text-zinc-400 mb-4" />
            <h2 className="text-2xl font-semibold text-zinc-300 mb-2">No Notes Yet</h2>
            <p className="text-zinc-400 mb-6">Start by clicking one of the buttons below.</p>
            <div className="flex pt-5 border-t border-t-[#1f1f1f] items-center justify-center gap-2">
              <button className="self-center border border-zinc-600 text-zinc-400 transition hover:bg-zinc-800/80 p-2 rounded-lg flex gap-2 hover:text-zinc-100">
                <FileText />
                Import existing note
              </button>
              <span className="px-3 text-zinc-500 dark:text-zinc-400">OR</span>
              <button
                className="self-center border border-zinc-600 text-zinc-400 transition hover:bg-zinc-800/80 p-2 rounded-lg flex gap-2 hover:text-zinc-100"
                onClick={onCreate}
              >
                <Plus />
                Create New Note
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center h-full justify-center space-y-4">
          <FileCode2 className="h-12 w-12 text-zinc-200" />
          <h2 className="text-2xl font-semibold text-zinc-200">No notes selected</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Please select a note from the list or{" "}
            <button
              className="underline transition hover:text-white animate-pulse"
              onClick={onCreate}
            >
              create a new one.
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
