import Image from "next/image";
import {
  DropdownState,
  DropdownStateAndSetters,
  IScreenPos,
  menuOption,
} from "./types";
import styles from "./styles.module.scss";
import { useLayoutEffect } from "react";

export default function DropdownMenu(
  props: DropdownStateAndSetters & {
    dropdownRef: React.RefObject<HTMLDivElement | null>;
  }
) {
  const { menuOptions, screenPosition, isOpen, dropdownRef } = props;

  console.log(window.innerWidth);
  console.log(dropdownRef.current?.clientWidth);

  useLayoutEffect(() => {
    console.log("-->", dropdownRef.current?.clientHeight);
    console.log("pos:", screenPosition);
  }, [screenPosition, menuOptions, isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`dropdown-menu ${styles["dropdown-menu"]} ${
        !isOpen ? styles.closed : ""
      }`}
      style={{
        left: Math.min(
          screenPosition.x,
          window.innerWidth - (dropdownRef.current?.clientWidth ?? 0) - 5
        ),
        top: Math.min(
          screenPosition.y,
          window.innerHeight - (dropdownRef.current?.clientHeight ?? 0) - 5
        ),
        transformOrigin:
          "center " +
          Math.max(
            0,
            screenPosition.y +
              (dropdownRef.current?.clientHeight ?? 0) -
              window.innerHeight
          ) +
          "px",
      }}
    >
      {menuOptions.map((menuOption, i) => {
        const { icon, label, type, onClick } = menuOption;
        const key = `${type}-${i}-${label}-${icon}`;

        switch (type) {
          case "option":
            return (
              <button
                key={key}
                className={`menu-option ${styles["menu-option"]}`}
                onClick={onClick}
              >
                {icon && (
                  <Image src={icon} alt="option icon" width={16} height={16} />
                )}
                {label && <span>{label}</span>}
              </button>
            );
          case "title":
            return (
              <div key={key} className={`menu-title ${styles["menu-title"]}`}>
                {icon && (
                  <Image src={icon} alt="option icon" width={16} height={16} />
                )}
                {label}
              </div>
            );
          case "break":
            return <br key={key} />;
          case "line-break":
            return <hr key={key} />;
          default:
            return <div key={key}>Should not get here...</div>;
        }
      })}
    </div>
  );
}
