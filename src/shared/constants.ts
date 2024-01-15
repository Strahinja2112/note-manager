import { INoteInfo } from "./types";

export const appDirectoryName = "DIRECTORY";

export const mocks: INoteInfo[] = [
  {
    lastEditTime: new Date().getTime(),
    title: "Welcome"
  },
  {
    lastEditTime: new Date().getTime(),
    title: "Hello"
  },
  {
    lastEditTime: new Date().getTime(),
    title: "Bye"
  }
];
