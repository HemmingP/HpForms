import React, { createContext, ReactNode, useContext, useState } from "react";

interface FormState {
  formId: number;
  currentDraggedKey?: number;
  dragDropAction: (keyPart1: number, keyPart2: number) => void;
}

interface FormContextType {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

// Create a context with a default value (optional)
const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
  initialValues: FormState;
}

const FormProvider: React.FC<FormProviderProps> = ({
  children,
  initialValues,
}) => {
  // Get the current context value from the parent
  const [formState, setFormState] = useState<FormState>(initialValues);

  // Merge the current context with the new value
  //   const mergedValue = { ...currentContext, ...value };

  return (
    <FormContext.Provider value={{ formState, setFormState }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook for consuming the context
const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export { FormProvider, useFormContext };
