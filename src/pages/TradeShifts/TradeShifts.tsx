import classes from "./trade-shifts.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import "react-nice-dates/build/style.css";
import Header from "../../components/Header/Header";
import "react-nice-dates/build/style.css";
import ShiftTradeCard from "../../components/ShiftTradeCard/ShiftTradeCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShiftContext } from "../../contexts/ShiftContext";
import { Shift } from "../../types/shift.interface";
import { ShiftsTradeContext } from "../../contexts/ShiftsTradeContext";

interface shiftDates {
  shiftDate: Date | undefined;
}

const TradeShifts = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  if (loggedInUser) {
    setLoggedInUser(loggedInUser);
  }

  const { stateTradeShifts, setStateTradeShifts } =
    useContext(ShiftsTradeContext);
  const { stateShift, setStateShift } = useContext(ShiftContext);
  const [tradedShifts, setTradedShifts] = useState<Shift[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getTradedShifts = async () => {
      if (loggedInUser) {
        try {
          const resTradeShifts = await axios.get(
            "http://localhost:5000/shifts/getShifts"
            // {
            //   withCredentials: true,
            // }
          );

          setStateTradeShifts(resTradeShifts.data);
          const res = stateTradeShifts.filter((shift) => shift.traded === true);
          setTradedShifts(res);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getTradedShifts();
  }, [tradedShifts]);

  const shifts = tradedShifts.map((shift) => (
    <ShiftTradeCard shift={shift} key={shift._id} />
  ));

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header shiftDate={undefined} />
      </div>
      <div className={classes.cards}>{shifts}</div>
    </div>
  );
};

export default TradeShifts;
