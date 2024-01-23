import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { TGetNotes, TReadNoteData } from "@shared/types";
import { BrowserWindow, app, ipcMain, shell } from "electron";
import { join } from "path";
import { getNotes, readNoteData } from "./lib";
// ! THROWS ERROR
// import icon from "../../resources/icon.png";

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1050,
    height: 700,
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
