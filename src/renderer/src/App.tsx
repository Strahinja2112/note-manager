import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from "@mdxeditor/editor";

import { useAtomValue } from "jotai";
import { FileText, PencilIcon, Plus, StickyNoteIcon } from "lucide-react";
import { useRef } from "react";
import Editor from "./components/Editor";
import NoteTitle from "./components/NoteTitle";
import Sidebar from "./components/Sidebar";
import useMarkdownEditor from "./hooks/useMarkdownEditor";
import { useNotes } from "./hooks/useNotes";
import RootLayout from "./layouts/RootLayout";

export default function App() {
  const editorRef = useRef<HTMLDivElement>(null);

  const { selectedNote } = useMarkdownEditor();

  const { notes } = useNotes({});

  return (
    <RootLayout>
      <Editor ref={editorRef} className="rounded-none bg-zinc-900/40">
        {selectedNote ? (
          <>
            <NoteTitle />
            <MDXEditor
              key={selectedNote.title + selectedNote.lastEditTime}
              markdown={selectedNote.content}
              plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
              contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
            />
          </>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <PencilIcon className="h-16 w-16 text-gray-500 dark:text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No Notes Yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start by clicking one of the buttons below.
            </p>
            <div className="flex pt-5 border-t border-t-[#1f1f1f] items-center justify-center gap-2">
              <button className="self-center border border-[#414141] transition hover:bg-[#414141] p-2 rounded-lg  flex gap-2">
                <FileText />
                Import existing note
              </button>
              <span className="px-3 text-gray-500 dark:text-gray-400">OR</span>
              <button className="self-center border border-[#414141] transition hover:bg-[#414141] p-2 rounded-lg flex gap-2">
                <Plus />
                Create New Note
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center h-full justify-center space-y-4">
            <StickyNoteIcon className="h-12 w-12 text-gray-200" />
            <h2 className="text-2xl font-semibold text-gray-200">No notes selected</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Please select a note from the list or{" "}
              <button className="underline transition hover:text-white animate-pulse">
                create a new one.
              </button>
            </p>
          </div>
        )}
      </Editor>
      {notes.length > 0 ? (
        <Sidebar
          onSelect={() => {
            editorRef.current?.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }}
          className="p-2"
        />
      ) : null}
    </RootLayout>
  );
}
