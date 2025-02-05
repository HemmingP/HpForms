import React, {
  createContext,
  createRef,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DropdownState, IScreenPos, menuOption } from "./types";
import DropdownMenu from "./DropdownMenu";

interface DropdownContextType {
  dropdownState: DropdownState;
  setDropdownState: (partialState: Partial<DropdownState>) => void;
}

// Create a context with a default value (optional)
const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

interface DropdownProviderProps {
  children: ReactNode;
  initialValues?: Partial<DropdownState>;
}

// Set default values if nothing is defined
const defaultInitialValues: DropdownState = {
  isOpen: false,
  menuOptions: [],
  screenPosition: { x: 0, y: 0 },
};

const DropdownProvider: React.FC<DropdownProviderProps> = ({
  children,
  initialValues,
}) => {
  // Get the current context value from the parent
  const [dropdownState, _setDropdownState] = useState<DropdownState>({
    ...defaultInitialValues,
    ...initialValues,
  });

  // Custom setDropdownState function to merge partial state
  const setDropdownState = (partialState: Partial<DropdownState>) => {
    _setDropdownState((prevState) => ({
      ...prevState,
      ...partialState,
    }));
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownState({ ...dropdownState, isOpen: false });
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [dropdownState]);

  return (
    <DropdownContext.Provider value={{ dropdownState, setDropdownState }}>
      {children}
      <DropdownMenu {...dropdownState} dropdownRef={dropdownRef} />
    </DropdownContext.Provider>
  );
};

// Custom hook for consuming the context
const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdownContext must be used within a DropdownProvider"
    );
  }
  return context;
};

export { DropdownProvider, useDropdownContext };
