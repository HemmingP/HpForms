import styles from "./styles.module.scss";
import { DragEventHandler, useCallback, useRef, useState } from "react";
import { pageBubblesProps } from "./types";

const PageBubbles: React.FC<pageBubblesProps> = ({ pages, setPageIndex }) => {
  const [isDragging, setIsDragging] = useState(false);
  const hoverStateRef = useRef(false); // Ref to track hover state
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to manage timeout

  const dragOver: React.DragEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault(); // Necessary to allow drop
    },
    []
  );

  const dragEnter: DragEventHandler<HTMLButtonElement> = useCallback((e) => {
    const index = parseInt(e.currentTarget.dataset.index || "", 10);
    hoverStateRef.current = true; // Set hover state

    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Start a new timeout
    hoverTimeoutRef.current = setTimeout(() => {
      if (hoverStateRef.current) {
        setPageIndex(index);
        // Trigger your event here
      }
    }, 300);

    setIsDragging(true); // Update local state for UI feedback
  }, []);

  const dragOut = useCallback(() => {
    hoverStateRef.current = false; // Reset hover state

    // Clear the timeout if the drag leaves early
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setIsDragging(false); // Update local state for UI feedback
  }, []);

  return (
    <div className={styles["page-bubbles"]}>
      {pages.map((page, i) => (
        <button
          key={page.pageName + "-" + i}
          className={styles["page-bubble"]}
          onClick={() => setPageIndex(i)}
          onDragEnter={dragEnter}
          onDragExit={dragOut}
          onDrop={dragOut}
          onDragOver={dragOver}
          data-index={i}
        >
          <div className={styles.bubble}>
            <img src={page.pageIcon} alt={page.pageName} />
          </div>
          <p>{page.pageName}</p>
        </button>
      ))}
    </div>
  );
};

export default PageBubbles;
