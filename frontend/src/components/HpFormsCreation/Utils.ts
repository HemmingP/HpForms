import { formPage } from "./types";

export function findPartKeyCoor(formPages: formPage[], keyPart: number) {
  for (let z = 0; z < formPages.length; z++) {
    const layouts = formPages[z].layouts;
    for (let y = 0; y < layouts.length; y++) {
      const parts = layouts[y].parts;
      for (let x = 0; x < parts.length; x++) {
        if (parts[x].partkey === keyPart) {
          return { x, y, z };
        }
      }
    }
  }
  return undefined;
}
