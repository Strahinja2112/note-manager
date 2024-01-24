import { WindowContextAPI } from "@shared/types";
import { contextBridge, ipcRenderer } from "electron";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

try {
  const options: WindowContextAPI = {
    locale: navigator.language,
    windowActions: {
      close: () => ipcRenderer.invoke("closeWindow"),
      minimize: () => ipcRenderer.invoke("minimizeWindow"),
      maximize: () => ipcRenderer.invoke("maximizeWindow")
    },
    getNotes: () => ipcRenderer.invoke("getNotes"),
    readNoteData: (fileName) => ipcRenderer.invoke("readNoteData", fileName),
    saveNote: (fileName, content) => ipcRenderer.invoke("saveNote", fileName, content),
    renameNote: (title, newTitle) => ipcRenderer.invoke("renameNote", title, newTitle)
  };

  contextBridge.exposeInMainWorld("context", options);
} catch (error) {
  console.error(error);
}
