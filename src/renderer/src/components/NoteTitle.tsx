import { useNotes } from "@renderer/store/useNotes";
import { Check } from "lucide-react";
import { useState } from "react";

export default function NoteTitle() {
  const [editing, setEditing] = useState(false);
  const { selectedNote, onRename } = useNotes();
  const [newName, setNewName] = useState(selectedNote?.title || "");

  return (
    <div
      onClick={() => setEditing(false)}
      className="flex sticky top-0 inset-0 bg-[rgb(11,11,11)] h-[55px] border-b items-center justify-center px-5"
    >
      {editing ? (
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onClick={(e) => {
            e.stopPropagation();
            if (newName === "") {
              setNewName(selectedNote?.title || "");
            }
          }}
          onKeyUp={(e) => {
            console.log(e.key === "Enter");
            if (e.key === "Enter" && selectedNote?.title) {
              onRename(selectedNote.title, newName);
              setEditing(false);
            }
          }}
          className="bg-transparent rounded-r-none outline-none border px-1 rounded-lg py-0.5 text-2xl"
        />
      ) : (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
          }}
          className="text-gray-200 cursor-pointer text-2xl"
        >
          {selectedNote?.title}
        </span>
      )}
    </div>
  );
}
