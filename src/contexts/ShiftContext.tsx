import React, { createContext, useState } from "react";
import { Shift } from "../types/shift.interface";

interface ShiftContextProps {
  stateShift: Shift | undefined;
  setStateShift: (shift: Shift | undefined) => void;
}

export const ShiftContext = createContext<ShiftContextProps>({
  stateShift: undefined,
  setStateShift: () => {},
});

interface ShiftProviderProps {}

export const ShiftProvider: React.FC<ShiftProviderProps> = (props) => {
  const [stateShift, setStateShift] = useState<Shift | undefined>();

  return (
    <ShiftContext.Provider value={{ stateShift, setStateShift }}>
      {props.children}
    </ShiftContext.Provider>
  );
};
