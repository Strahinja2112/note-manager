import DraggableTopbar from "./components/DraggableTopbar";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import RootLayout from "./layouts/RootLayout";

export default function App() {
  return (
    <>
      <DraggableTopbar />
      <RootLayout>
        <Editor className="border-r rounded-none bg-zinc-900/30 border-r-white/20">asd</Editor>
        <Sidebar className="p-2">Sidebar</Sidebar>
      </RootLayout>
    </>
  );
}
