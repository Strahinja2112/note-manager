import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { TDeleteNote, TGetNotes, TReadNoteData, TRenameNote, TSaveNote } from "@shared/types";
import { BrowserWindow, app, ipcMain, shell } from "electron";
import { join } from "path";
import { deleteNote, getNotes, getRootDir, readNoteData, renameNote, saveNote } from "./lib";
// ! THROWS ERROR
// import icon from "../../resources/icon.png?asset";

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    // ...(process.platform === "linux" ? { icon } : {}),
    center: true,
    title: "Note Manager",
    transparent: true,
    frame: false,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: true,
      contextIsolation: true
    }
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return {
      action: "deny"
    };
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  handleNoteEvents();
  handleWindowEvents();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function handleNoteEvents() {
  ipcMain.handle("getNotes", (_, ...args: Parameters<TGetNotes>) => getNotes(...args));
  ipcMain.handle("readNoteData", (_, ...args: Parameters<TReadNoteData>) => readNoteData(...args));
  ipcMain.handle("saveNote", (_, ...args: Parameters<TSaveNote>) => saveNote(...args));
  ipcMain.handle("renameNote", (_, ...args: Parameters<TRenameNote>) => renameNote(...args));
  ipcMain.handle("deleteNote", (_, ...args: Parameters<TDeleteNote>) => deleteNote(...args));
  ipcMain.handle("getRootDir", getRootDir);
  ipcMain.handle("openInShell", (_, path) => shell.openPath(path + "\\"));
}

function handleWindowEvents() {
  ipcMain.handle("closeWindow", () => app.quit());
  ipcMain.handle("minimizeWindow", () => mainWindow?.minimize());
  ipcMain.handle("maximizeWindow", () => {
    if (mainWindow?.isMaximized()) {
      mainWindow?.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });
}
