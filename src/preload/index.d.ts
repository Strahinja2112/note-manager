// !!!!!!!! DONT REMOVE THIS IMPORT, YOU HAVE TO HAVE AT LEAST ONE IMPORT HERE
import React from "react";

declare global {
  interface Window {
    electron: ElectronAPI;
    context: {
      locale: navigator.language;
    };
  }
}
