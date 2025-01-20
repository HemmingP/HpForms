import Image from "next/image";
import { IScreenPos, menuOption } from "./types";

interface props {
  isOpen: boolean;
  screenPosition: IScreenPos;
  menuOptions: menuOption[];
}
export default function DropdownMenu({
  isOpen = false,
  screenPosition = { x: 0, y: 0 },
  menuOptions = [
    {
      type: "option",
      icon: "/menu-icons/crown-svgrepo-com.svg",
      label: "Empty menu",
      onClick: () => {
        console.log("Click with no effect.");
      },
    },
  ],
}: props) {
  return (
    <div className="dropdown-menu">
      {menuOptions.map((menuOption, i) => {
        const { icon, label, type, onClick } = menuOption;
        const key = `${type}-${i}-${label}-${icon}`;

        switch (type) {
          case "option":
            return (
              <button key={key} className="menu-option" onClick={onClick}>
                {icon && <Image src={icon} alt="option icon" />}
                {label && <span>{label}</span>}
              </button>
            );
          case "title":
            return (
              <div key={key} className="menu-title">
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
