import { IS_DEV, appDirectoryName, fileEncoding } from "@shared/constants";
import { INoteInfo } from "@shared/types";
import { ensureDir, readdir, stat } from "fs-extra";
import { homedir } from "os";

export function getRootDir(): string {
  return `${homedir()}/${appDirectoryName}`;
}

export async function getNotes(): Promise<INoteInfo[]> {
  console.log("CALLED");
  const rootDir = getRootDir();
  console.log(rootDir);

  await ensureDir(rootDir);

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  });

  const allNotes = notesFileNames.filter((file) => file.endsWith(".md"));

  return Promise.all(allNotes.map(getNoteInfo));
}

export async function getNoteInfo(fileName: string): Promise<INoteInfo> {
  const fileStats = await stat(`${getRootDir()}/${fileName}`);

  return {
    title: fileName.replace(/\.md$/, ""),
    lastEditTime: fileStats.mtimeMs
  };
}
