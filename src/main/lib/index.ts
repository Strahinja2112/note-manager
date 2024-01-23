import { appDirectoryName, fileEncoding } from "@shared/constants";
import { INoteInfo } from "@shared/types";
import { ensureDir, readdir, stat } from "fs-extra";
import { homedir } from "os";

export function getRootDir(): string {
  return `${homedir()}/${appDirectoryName}`;
}

export async function getAllNotes(): Promise<INoteInfo[]> {
  const rootDir = getRootDir();

  await ensureDir(rootDir);

  const allFiles = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  });

  const allNotes = allFiles.filter((file) => file.endsWith(".md"));

  return await Promise.all(allNotes.map(getNoteInfo));
}

export async function getNoteInfo(fileName: string): Promise<INoteInfo> {
  const fileStats = await stat(fileName);

  return {
    title: fileName.replace(".md", ""),
    lastEditTime: fileStats.mtimeMs
  };
}
