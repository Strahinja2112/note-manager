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
    openInShell(path) {
      return ipcRenderer.invoke("openInShell", path);
    },
    getRootDir() {
      return ipcRenderer.invoke("getRootDir");
    },
    getNotes() {
      return ipcRenderer.invoke("getNotes");
    },
    readNoteData(fileName) {
      return ipcRenderer.invoke("readNoteData", fileName);
    },
    saveNote(note, create) {
      return ipcRenderer.invoke("saveNote", note, create);
    },
    renameNote(title, newTitle) {
      return ipcRenderer.invoke("renameNote", title, newTitle);
    },
    deleteNote(note) {
      return ipcRenderer.invoke("deleteNote", note);
    }
  };

  contextBridge.exposeInMainWorld("context", options);
} catch (error) {
  console.error(error);
}
