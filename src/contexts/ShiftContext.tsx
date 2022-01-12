import React, { createContext, useState } from "react";
import { Shift } from "../types/shift.interface";

interface UserContextProps {
  stateShift: Shift | undefined;
  setStateShift: (shift: Shift | undefined) => void;
}

export const ShiftContext = createContext<UserContextProps>({
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
