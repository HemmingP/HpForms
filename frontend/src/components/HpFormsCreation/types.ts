import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export interface id {
  id: string;
}

interface partProp {
  partkey: number;
  label: string;
  skip: number; // default 0
  span: number; // default 1
}

export interface emptyProps {
  className: string;
}

type TVariant = "input" | "textarea" | "text";

export interface IOptions {
  openpartoptions: (partkey: number, variant: TVariant) => void;
}

export interface inputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    partProp {
  variant: "input";
}

export interface textareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    partProp {
  variant: "textarea";
}

export type allowedTextTags = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export interface textProps extends partProp {
  variant: "text";
  tag: allowedTextTags;
  text: string;
}

// export type formInput = Partial<inputProps | textareaProps>;
// Create a new type where key is always required
// export type formInput =
//   | (Omit<Partial<inputProps>, "partkey"> & { partkey: number })
//   | (Omit<Partial<textareaProps>, "partkey"> & { partkey: number })
//   | textProps;
export type formInput = inputProps | textareaProps | textProps;

export interface formLayout {
  // template: template;
  columnsAmount: number;
  parts: formInput[];
}

export interface formPage {
  pageName: string;
  pageIcon: string;
  layouts: formLayout[];
}

export interface pageBubblesProps {
  pages: formPage[];
  setPageIndex: (index: number) => void;
}

export default interface form {
  formId: number;
  maxPartkey: number;
  formName: string;
  pages: formPage[];
}
