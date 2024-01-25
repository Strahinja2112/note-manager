import { WindowContextAPI } from "@shared/types";
import { contextBridge, ipcRenderer } from "electron";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

try {
  const options: WindowContextAPI = {
    locale: navigator.language,
    windowActions: {
      close() {
        ipcRenderer.invoke("closeWindow");
      },
      minimize() {
        ipcRenderer.invoke("minimizeWindow");
      },
      maximize() {
        ipcRenderer.invoke("maximizeWindow");
      }
    },
    getNotes() {
      return ipcRenderer.invoke("getNotes");
    },
    readNoteData(fileName) {
      return ipcRenderer.invoke("readNoteData", fileName);
    },
    saveNote(fileName, content, create) {
      return ipcRenderer.invoke("saveNote", fileName, content, create);
    },
    renameNote(title, newTitle) {
      return ipcRenderer.invoke("renameNote", title, newTitle);
    }
  };

  contextBridge.exposeInMainWorld("context", options);
} catch (error) {
  console.error(error);
}
