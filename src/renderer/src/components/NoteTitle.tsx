import { useNotes } from "@renderer/store/useNotes";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import DraggableTopbar from "./DraggableTopbar";

export default function NoteTitle() {
  const [editing, setEditing] = useState(false);
  const { selectedNote, onRename } = useNotes();
  const [newName, setNewName] = useState(selectedNote?.title || "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      onClick={() => setEditing(false)}
      className="flex sticky top-0 inset-0 bg-[rgb(11,11,11)] h-[55px] border-b items-center justify-center px-5"
    >
      {editing ? (
        <input
          ref={inputRef}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onClick={(e) => {
            e.stopPropagation();
            if (newName === "") {
              setNewName(selectedNote?.title || "");
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" && selectedNote?.title) {
              if (newName === "") {
                toast.error("Please enter a valid file name!");
              } else {
                onRename(selectedNote.title, newName).then(() => {
                  toast.success("Your note was successfully renamed!");
                });
                setEditing(false);
              }
            }
          }}
          className="bg-transparent outline-none border px-1 rounded-lg py-0.5 text-2xl"
        />
      ) : (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
            inputRef.current?.focus();
          }}
          className="text-gray-200 cursor-pointer text-2xl"
        >
          {selectedNote?.title}
        </span>
      )}
    </div>
  );
}
