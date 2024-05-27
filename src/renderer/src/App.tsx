import { useRef } from "react";
import { Toaster } from "react-hot-toast";
import Editor from "./components/Editor";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import { useLocation } from "./hooks/useLocation";
import { useNotes } from "./hooks/useNotes";
import RootLayout from "./layouts/RootLayout";

export default function App() {
  const editorRef = useRef<HTMLDivElement>(null);

  const { filesAndFolders } = useNotes();
  const { location } = useLocation();

  return (
    <RootLayout>
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(11,11,11)",
            border: "1px solid hsl(240 3.7% 10.9%)",
            color: "white"
          },
          position: "bottom-left"
        }}
      />
      {location === "main" ? <Editor /> : <Settings />}
      {filesAndFolders.length > 0 ? (
        <Sidebar
          onSelect={() => {
            editorRef.current?.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }}
        />
      ) : null}
    </RootLayout>
  );
}
