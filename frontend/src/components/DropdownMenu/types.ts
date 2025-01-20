import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface IScreenPos {
  x: number;
  y: number;
}

type menuOptionType = "option" | "title" | "break" | "line-break";

export interface menuOption {
  type: menuOptionType;
  icon?: string | StaticImport;
  label?: string;
  onClick?: () => void | boolean;
}
