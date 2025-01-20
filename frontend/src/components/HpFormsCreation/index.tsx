"use client";

import styles from "./styles.module.scss";
import React, {
  CSSProperties,
  Fragment,
  useContext,
  useState,
  ReactNode,
  useCallback,
  DragEventHandler,
  useRef,
} from "react";
import form, {
  allowedTextTags,
  formInput,
  formLayout,
  id,
  inputProps,
  textareaProps,
  textProps,
  emptyProps,
  formPage,
  pageBubblesProps,
} from "./types";
import { FormProvider, useFormContext } from "./FromContext";
import PageBubbles from "./PageBubbles";
import { findPartKeyCoor } from "./Utils";
import HpPart, { EmptyInput } from "./HpPart";
import DropdownMenu from "../DropdownMenu";

/**
 * Layout represents a row in a form
 */
const HpLayout: React.FC<formLayout> = ({ parts, columnsAmount }) => {
  const partsOccupiedAmount = parts.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.span ?? 1) + (currentValue.skip ?? 0),
    0
  );

  const partsRemainingAmount = columnsAmount - partsOccupiedAmount;

  const partsAddedLast = Array(partsRemainingAmount);
  partsAddedLast.fill(1);

  return (
    <Fragment>
      {parts.map((aPart, i) => {
        return (
          <HpPart
            {...aPart}
            key={aPart.partkey}
            openpartoptions={(partKey, variant) => {}}
          />
        );
      })}
      {partsAddedLast.map((_, i) => (
        <EmptyInput key={`empty-last-${i}`} className="rest-filler" />
      ))}
    </Fragment>
  );
};

interface props {
  className: string;
  formInfo: form;
}

/**
 * The outer most component in the form creation
 */
export default function HpFormsCreation({ formInfo, className = "" }: props) {
  const [form, setForm] = useState<form>(formInfo);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const dragDropAction = (keyPart1: number, keyPart2: number) => {
    setForm((prevForm) => {
      const currForm = structuredClone(prevForm);
      const currFormPages = currForm.pages;

      const keyPart1Coor = findPartKeyCoor(currFormPages, keyPart1);
      const keyPart2Coor = findPartKeyCoor(currFormPages, keyPart2);

      if (keyPart1Coor && keyPart2Coor) {
        const { x: x1, y: y1, z: z1 } = keyPart1Coor;
        const { x: x2, y: y2, z: z2 } = keyPart2Coor;

        const temp1 = { ...currFormPages[z1].layouts[y1].parts[x1] };
        const temp1Skip = temp1.skip;
        const temp1Span = temp1.span;
        const temp2 = { ...currFormPages[z2].layouts[y2].parts[x2] };
        const temp2Skip = temp2.skip;
        const temp2Span = temp2.span;

        currFormPages[z1].layouts[y1].parts[x1] = {
          ...temp2,
          skip: temp1Skip,
          span: temp1Span,
        };
        currFormPages[z2].layouts[y2].parts[x2] = {
          ...temp1,
          skip: temp2Skip,
          span: temp2Span,
        };
      }

      return currForm;
    });
  };

  return (
    <FormProvider
      initialValues={{
        formId: form.formId,
        dragDropAction,
      }}
    >
      <div
        className={`hp-forms-creation ${className} ${styles["hp-forms-creation"]}`}
      >
        <PageBubbles
          pages={form.pages}
          setPageIndex={(i) => setCurrentPage(i)}
        />
        <div className={styles.layout}>
          {form.pages[currentPage].layouts.map((layout, i) => {
            const partKeys = layout.parts.reduce(
              (prevKeys, currVal) => `${prevKeys}-${currVal.partkey}`,
              ""
            );
            return (
              <HpLayout
                key={`${i}-${partKeys}`}
                columnsAmount={layout.columnsAmount}
                parts={layout.parts}
              />
            );
          })}
        </div>
        <DropdownMenu
          isOpen={true}
          menuOptions={[
            {
              label: "asd",
              type: "option",
              icon: "/menu-icons/crown-svgrepo-com.svg",
            },
          ]}
          screenPosition={{ x: 0, y: 0 }}
        />
      </div>
    </FormProvider>
  );
}
