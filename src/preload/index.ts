import { contextBridge, ipcRenderer } from "electron";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
    windowActions: {
      close: () => ipcRenderer.invoke("closeWindow"),
      minimize: () => ipcRenderer.invoke("minimizeWindow"),
      maximize: () => ipcRenderer.invoke("maximizeWindow")
    },
    getNotes: () => ipcRenderer.invoke("getNotes"),
    readNoteData: (fileName: string) => ipcRenderer.invoke("readNoteData", fileName)
  });
} catch (error) {
  console.error(error);
}
