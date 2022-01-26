import axios from "axios";
import { FC, useState, useCallback, useContext } from "react";
import Swal from "sweetalert2";
import { ShiftContext } from "../../contexts/ShiftContext";
import { ShiftsContext } from "../../contexts/ShiftsContext";
import { UserContext } from "../../contexts/UserContext";
import { Shift } from "../../types/shift.interface";
import { responseOk } from "../../utils/axios.util";
import classes from "./shift-trade-card.module.scss";

interface TradedShiftsProps {
  shift: Shift;
}

const ShiftTradeCard: FC<TradedShiftsProps> = ({ shift }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  if (loggedInUser) {
    setLoggedInUser(loggedInUser);
  }
  const { stateShifts, setStateShifts } = useContext(ShiftsContext);
  const { stateShift, setStateShift } = useContext(ShiftContext);
  const [tradedShifts, setTradedShifts] = useState<Shift[]>([]);

  const date = new Date(shift.shiftDate).toLocaleDateString("he-IL");

  const getTradedShift = useCallback(() => {
    const sendRequest = async () => {
      try {
        const response = await axios.put(
          `http://localhost:5000/shifts/getTradedShift/${shift._id}`,
          {
            traded: false,
            shiftPerson: loggedInUser?.fullName,
            shiftPersonId: loggedInUser?._id,
          },
          {
            withCredentials: true,
          }
        );
        Swal.fire({
          icon: "success",
          title: "התורנות נלקחה בהצלחה",
          showConfirmButton: false,
          timer: 1500,
        });

        if (!responseOk(response)) {
          throw new Error("response error");
        }
      } catch (error) {
        console.error(error);
      }
    };

    sendRequest();
  }, [shift.shiftDate]);

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <form>
          <div className={classes.inputContainer}>
            <input
              value={shift.shiftName}
              type="text"
              name="ShiftName"
              autoComplete="off"
              className={classes.shiftInputName}
              readOnly
            ></input>

            <input
              value={date}
              type="text"
              name="date"
              autoComplete="off"
              className={classes.shiftInputDate}
              readOnly
            ></input>

            <input
              value={shift.shiftPerson}
              type="text"
              name="CurrentPeron"
              autoComplete="off"
              className={classes.shiftInput}
              readOnly
            ></input>

            <div className={classes.hourCont}>
              <input
                value={shift.endTimeValue}
                type="text"
                name="shiftEndTime"
                autoComplete="off"
                className={classes.shiftInputHour}
                readOnly
              ></input>

              <span>-</span>

              <input
                value={shift.startTimeValue}
                type="text"
                name="shiftStartTime"
                autoComplete="off"
                className={classes.shiftInputHour}
                readOnly
              ></input>
            </div>

            <div className={classes.buttonContainer}>
              <button
                type="button"
                onClick={getTradedShift}
                className={classes.createShift}
              >
                קח תורנות
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ShiftTradeCard;
