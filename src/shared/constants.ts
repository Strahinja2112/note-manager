import Settings from "@renderer/components/Settings";
import Editor from "../renderer/src/components/Editor";
import { TRoute } from "./types";

export const appDirectoryName = "notemark_data";
export const fileEncoding = "utf8";
export const startingNoteData = `## Welcome to NoteManager!
- You can edit this note now!
- You can click on the title in the header to change it's name!`;
export const myRepoLink = `https://github.com/strahinja2112/`;
export const projectRepoLink = myRepoLink + "note-manager/";
export const mainComponents: Record<TRoute, (params: any) => JSX.Element> = {
  editor: Editor,
  settings: Settings
};
