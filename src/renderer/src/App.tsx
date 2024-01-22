import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from "@mdxeditor/editor";

import { useRef } from "react";
import Editor from "./components/Editor";
import NoteTitle from "./components/NoteTitle";
import Sidebar from "./components/Sidebar";
import RootLayout from "./layouts/RootLayout";

export default function App() {
  const editorRef = useRef<HTMLDivElement>(null);

  return (
    <RootLayout>
      <Editor ref={editorRef} className="rounded-none bg-zinc-900/40">
        <NoteTitle />
        <MDXEditor
          key={""}
          markdown={"allNotes.activeNote.content"}
          plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
          contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
        />
      </Editor>
      <Sidebar
        onSelect={() =>
          editorRef.current?.scrollTo({
            top: 0,
            behavior: "smooth"
          })
        }
        className="p-2"
      />
    </RootLayout>
  );
}
