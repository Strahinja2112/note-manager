import { appDirectoryName, fileEncoding } from "@shared/constants";
import { FileAndFolderData, NoteInfo } from "@shared/types";
import { ensureDir, readFile, readdir, remove, stat, writeFile } from "fs-extra";
import { homedir } from "os";

export function getRootDir(): string {
  return `${homedir()}\\${appDirectoryName}`;
}

export async function getNotes(): Promise<NoteInfo[]> {
  const rootDir = getRootDir();

  await ensureDir(rootDir);

  const allFilesAndFolders: FileOrFolder[] = await readAllFilesAndFolders(rootDir, ".md");
  const allFilesAndFoldersData: FileAndFolderData[] = await getNoteInfoRec(
    allFilesAndFolders,
    rootDir
  );
  console.log(JSON.stringify(allFilesAndFoldersData, null, 2));

  return [];
}

async function getNoteInfoRec(data: FileOrFolder[], path: string): Promise<FileAndFolderData[]> {
  const result = await Promise.all(
    data.map(async (element): Promise<FileAndFolderData> => {
      console.log(path);
      if (typeof element === "string") {
        const result = await getNoteInfo(`${path}\\${element}`);

        return {
          type: "file",
          fullPath: `${path}\\${element}`,
          ...result
        };
      }

      const result = await getNoteInfoRec(element.data, `${path}\\${element.name}`);

      return {
        type: "folder",
        title: element.name,
        fullPath: `${path}\\${element.name}`,
        data: result
      };
    })
  );

  return result;
}

export async function getNoteInfo(filePath: string): Promise<NoteInfo> {
  const fileStats = await stat(filePath);

  const filePathParts = filePath.split("\\");

  return {
    title: filePathParts[filePathParts.length - 1].replace(/\.md$/, ""),
    lastEditTime: fileStats.mtimeMs
  };
}

export async function readNoteData(fileName: string): Promise<string> {
  const rootDir = getRootDir();
  return readFile(`${rootDir}/${fileName}.md`, {
    encoding: fileEncoding
  });
}

export async function saveNote(title: string, content: string): Promise<void> {
  const rootDir = getRootDir();

  return writeFile(`${rootDir}/${title}.md`, content, {
    encoding: fileEncoding
  });
}

export async function renameNote(
  oldTitle: string,
  newTitle: string
): Promise<{
  success: boolean;
  content: string;
}> {
  const rootDir = getRootDir();

  try {
    const content = await readNoteData(oldTitle);

    await remove(`${rootDir}/${oldTitle}.md`);

    await writeFile(`${rootDir}/${newTitle}.md`, content, {
      encoding: fileEncoding
    });

    return {
      success: true,
      content
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      content: ""
    };
  }
}

type FileOrFolder =
  | string
  | {
      name: string;
      data: FileOrFolder[];
    };

async function readAllFilesAndFolders(path: string, extension?: string): Promise<FileOrFolder[]> {
  try {
    const dataInPath = await readdir(path, {
      withFileTypes: false
    });

    const result = await Promise.all(
      dataInPath.map(async (element: string | Buffer) => {
        const fullPath = `${path}/${element}`;
        const stats = await stat(fullPath);

        if (stats.isDirectory()) {
          const data = await readAllFilesAndFolders(fullPath, extension);

          return {
            name: element.toString(),
            data
          };
        }

        if (typeof element === "string") {
          if (!extension || element.endsWith(extension)) {
            return element.toString();
          }
        }

        return null;
      })
    );

    return result.filter((el) => !!el) as FileOrFolder[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
