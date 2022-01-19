import React, { createContext, useState } from "react";
import { Shift } from "../types/shift.interface";

interface ShiftsTradeContextProps {
  stateTradeShifts: Shift[];
  setStateTradeShifts: (shifts: Shift[]) => void;
}

export const ShiftsTradeContext = createContext<ShiftsTradeContextProps>({
  stateTradeShifts: [],
  setStateTradeShifts: () => {},
});

interface ShiftsTradeProviderProps {}

export const ShiftsTradeProvider: React.FC<ShiftsTradeProviderProps> = (
  props
) => {
  const [stateTradeShifts, setStateTradeShifts] = useState<Shift[]>([]);

  return (
    <ShiftsTradeContext.Provider
      value={{ stateTradeShifts, setStateTradeShifts }}
    >
      {props.children}
    </ShiftsTradeContext.Provider>
  );
};
