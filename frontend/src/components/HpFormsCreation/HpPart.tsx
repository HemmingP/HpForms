import styles from "./styles.module.scss";
import React, {
  CSSProperties,
  DragEventHandler,
  Fragment,
  useCallback,
  useState,
} from "react";
import { useFormContext } from "./FromContext";
import {
  allowedTextTags,
  emptyProps,
  formInput,
  id,
  inputProps,
  IOptions,
  textareaProps,
  textProps,
} from "./types";

export const EmptyInput: React.FC<emptyProps> = (props) => {
  return (
    <div className={props.className}>
      <span className={`${styles["empty-label"]}`}></span>
      <div className={`${styles["empty-input"]}`}></div>
    </div>
  );
};

const HpInput: React.FC<inputProps & id> = (props) => {
  return (
    <input
      id={props.id}
      className={`${styles.input}`}
      disabled={true}
      {...(props as inputProps)}
    />
  );
};
const HpTextarea: React.FC<textareaProps & id> = (props) => {
  return (
    <textarea
      id={props.id}
      className={`${styles.input}`}
      disabled={true}
      {...(props as textareaProps)}
    />
  );
};

interface dynamicTextProps {
  tag: allowedTextTags;
  id: string;
  className: string;
  style: CSSProperties;
  children: React.ReactNode;
}
const DynamicText: React.FC<dynamicTextProps> = (props) => {
  const { tag, children, id, className, style } = props;
  // Use React.createElement to dynamically render the tag
  return React.createElement(tag, { id, className, style }, children);
};

const HpText: React.FC<textProps & { style?: CSSProperties } & id> = (
  props
) => {
  const { text, style, tag } = props;
  return (
    <DynamicText
      tag={tag}
      id={props.id}
      className={styles.text}
      style={{ ...style }}
    >
      {text}
    </DynamicText>
  );
};

/**
 * Part represents one of the options that a use is able to insert into their form
 */
const HpPart: React.FC<formInput & IOptions> = (props) => {
  const {
    formState: { formId, currentDraggedKey, dragDropAction },
    setFormState,
  } = useFormContext();

  const { skip, span, variant, partkey, openpartoptions } = props;

  const [isDragged, setIsDragged] = useState<boolean>(false);
  const [isDraggedOn, setIsDraggedOn] = useState<boolean>(false);

  const actualSkip = skip ?? 0;
  const actualSpan = span ?? 1;

  const actualSpanValue = actualSpan;
  const inputStyles: CSSProperties = {
    gridColumn: `auto / span ${actualSpanValue}`,
  };

  const skips = Array(actualSkip);
  skips.fill(1);

  const id = `form-${formId}_part-${partkey}`;

  // DRAG FUNCTIONS
  const dragStart: DragEventHandler<HTMLDivElement> = useCallback(() => {
    setIsDragged(true);
    setFormState((state) => ({ ...state, currentDraggedKey: partkey }));
  }, [id, partkey]);

  const dragEnd: DragEventHandler<HTMLDivElement> = useCallback(() => {
    setIsDragged(false);
    setFormState((state) => ({ ...state, currentDraggedKeyId: undefined }));
  }, [id]);

  const dragEnter: DragEventHandler<HTMLDivElement> = useCallback(() => {
    setIsDraggedOn(true);
  }, [id]);

  const dragOver: DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
    },
    [id]
  );

  const dragLeave: DragEventHandler<HTMLDivElement> = useCallback(() => {
    setIsDraggedOn(false);
  }, [id]);

  const drop: DragEventHandler<HTMLDivElement> = useCallback(() => {
    setIsDraggedOn(false);
    if (currentDraggedKey !== undefined) {
      dragDropAction(currentDraggedKey, partkey);
    }
  }, [id, currentDraggedKey, partkey]);

  return (
    <Fragment>
      {skips.map((_, i) => (
        <EmptyInput key={`empty-${i}`} className="skip" />
      ))}
      <div
        className={`${styles.part} ${isDragged ? styles.dragged : ""} ${
          isDraggedOn ? styles["dragged-on"] : ""
        }`}
        style={{ ...inputStyles }}
        draggable={true}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        onDragEnter={dragEnter}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDrop={drop}
      >
        <label htmlFor={id} className={`${styles["input-label"]}`}>
          {props.label ? props.label + ":" : ""}
        </label>
        {variant === "textarea" ? (
          <HpTextarea id={id} {...props} />
        ) : variant === "text" ? (
          <HpText id={id} {...props} />
        ) : variant === "input" ? (
          <HpInput id={id} {...props} />
        ) : (
          "No variant given..."
        )}
        <button
          className={`${styles["part-options"]}`}
          onClick={() => {
            openpartoptions(partkey, variant);
          }}
        >
          <img src="/menu-icons/ellipsis-v-svgrepo-com.svg" />
        </button>
      </div>
    </Fragment>
  );
};

export default HpPart;
