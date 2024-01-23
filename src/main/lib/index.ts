import { appDirectoryName, fileEncoding } from "@shared/constants";
import { INoteInfo } from "@shared/types";
import { ensureDir, readFile, readdir, stat } from "fs-extra";
import { homedir } from "os";

export function getRootDir(): string {
  return `${homedir()}/${appDirectoryName}`;
}

export async function getNotes(): Promise<INoteInfo[]> {
  const rootDir = getRootDir();

  await ensureDir(rootDir);

  const allFiles = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  });

  const allNotes = allFiles.filter((file) => file.endsWith(".md"));

  return Promise.all(allNotes.map(getNoteInfo));
}

export async function getNoteInfo(fileName: string): Promise<INoteInfo> {
  const fileStats = await stat(`${getRootDir()}/${fileName}`);

  return {
    title: fileName.replace(/\.md$/, ""),
    lastEditTime: fileStats.mtimeMs
  };
}

export async function readNoteData(fileName: string): Promise<string> {
  const rootDir = getRootDir();
  return readFile(`${rootDir}/${fileName}.md`, {
    encoding: fileEncoding
  });
}
