import { appDirectoryName, fileEncoding } from "@shared/constants";
import { FileData, FileOrFolderData, NoteInfo } from "@shared/types";
import { dialog } from "electron";
import { ensureDir, readFile, readdir, remove, stat, writeFile } from "fs-extra";
import { homedir } from "os";

export function getRootDir(): string {
  return `${homedir()}\\${appDirectoryName}`;
}

export async function getNotes(): Promise<FileOrFolderData[]> {
  const rootDir = getRootDir();

  await ensureDir(rootDir);

  const allFilesAndFolders: FileOrFolder[] = await readAllFilesAndFolders(rootDir, ".md");
  const allFilesAndFoldersData: FileOrFolderData[] = await getNoteInfoRec(
    allFilesAndFolders,
    rootDir
  );
  // console.log(JSON.stringify(allFilesAndFoldersData, null, 2));

  return allFilesAndFoldersData.sort((a) => (a.type === "folder" ? -1 : 1));
}

async function getNoteInfoRec(data: FileOrFolder[], path: string): Promise<FileOrFolderData[]> {
  const result = await Promise.all(
    data.map(async (element): Promise<FileOrFolderData> => {
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
        lastEditTime: 0,
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

export async function readNoteData(filePath: string): Promise<string> {
  return readFile(filePath, {
    encoding: fileEncoding
  });
}

export async function saveNote(
  note: FileData | null,
  create: boolean = false
): Promise<FileData | void> {
  const rootDir = getRootDir();

  if (create) {
    const newNote: FileData = {
      type: "file",
      fullPath: "",
      lastEditTime: Date.now(),
      title: note?.title || "",
      content: note?.content || ""
    };

    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "New note!",
      defaultPath: `${rootDir}/Unititled.md`,
      buttonLabel: "Create",
      properties: ["showOverwriteConfirmation"],
      filters: [
        {
          name: "Markdown",
          extensions: ["md"]
        }
      ]
    });

    if (!canceled) {
      const parts = filePath?.split("\\");
      if (parts) {
        newNote.title = parts[parts.length - 1].replace(".md", "");
      }

      newNote.fullPath = filePath || "";

      if (filePath) {
        writeFile(filePath, newNote.content, {
          encoding: fileEncoding
        });
      }

      return newNote;
    }
  } else if (note) {
    writeFile(note?.fullPath, note?.content, {
      encoding: fileEncoding
    });
  }
}

export async function renameNote(
  oldNote: FileData | null,
  newTitle: string
): Promise<{
  success: boolean;
  content: string;
}> {
  if (!oldNote) {
    return {
      success: false,
      content: ""
    };
  }

  try {
    const content = await readNoteData(oldNote.fullPath);

    await remove(oldNote.fullPath);

    const oldPathSeparated = oldNote.fullPath.split("\\");
    oldPathSeparated.pop();

    const newPath = oldPathSeparated.join("\\") + "\\" + newTitle + ".md";

    console.log(newPath);

    await writeFile(newPath, content, {
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

export async function deleteNote(note: FileData): Promise<boolean> {
  console.log(note.fullPath);
  try {
    await remove(note.fullPath);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
