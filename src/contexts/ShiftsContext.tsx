import React, { createContext, useState } from "react";
import { Shift } from "../types/shift.interface";

interface ShiftsContextProps {
  stateShifts: Shift[];
  setStateShifts: (shifts: Shift[]) => void;
}

export const ShiftsContext = createContext<ShiftsContextProps>({
  stateShifts: [],
  setStateShifts: () => {},
});

interface ShiftsProviderProps {}

export const ShiftsProvider: React.FC<ShiftsProviderProps> = (props) => {
  const [stateShifts, setStateShifts] = useState<Shift[]>([]);

  return (
    <ShiftsContext.Provider value={{ stateShifts, setStateShifts }}>
      {props.children}
    </ShiftsContext.Provider>
  );
};
