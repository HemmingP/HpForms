import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface DropdownState {
  isOpen: boolean;
  screenPosition: IScreenPos;
  menuOptions: menuOption[];
}

interface DropdownSetters {
  setStates?: (DropdownState: Partial<DropdownState>) => void;
  setMenuOptions?: (menuOptions: menuOption[]) => void;
}

export type DropdownStateAndSetters = DropdownState & DropdownSetters;

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
