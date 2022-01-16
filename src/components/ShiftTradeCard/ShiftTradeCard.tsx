import axios from "axios";
import { FC, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./shift-trade-card.module.scss";

const ShiftTradeCard = () => {
  const [fullName, setFullName] = useState("");
  const [_id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <form>
          <div className={classes.inputContainer}>
            <label>תאריך התורנות</label>
            <input
              type="text"
              name="date"
              autoComplete="off"
              className={classes.shiftInput}
              readOnly
            ></input>

            <label>שם התורנות</label>
            <input
              type="text"
              name="ShiftName"
              autoComplete="off"
              className={classes.shiftInput}
              readOnly
            ></input>

            <label>תורן נוכחי</label>
            <input
              type="text"
              name="CurrentPeron"
              autoComplete="off"
              className={classes.shiftInput}
              readOnly
            ></input>

            <label>שעת התחלה</label>
            <input
              type="text"
              name="shiftStartTime"
              autoComplete="off"
              className={classes.shiftInput}
              readOnly
            ></input>

            <label>שעת סיום</label>
            <input
              type="text"
              name="shiftEndTime"
              autoComplete="off"
              className={classes.shiftInput}
              readOnly
            ></input>

            <div className={classes.buttonContainer}>
              <button
                type="button"
                // onClick={getShift}
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
