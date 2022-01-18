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
            <input
              value={"תורנות שמירה"}
              type="text"
              name="ShiftName"
              autoComplete="off"
              className={classes.shiftInputName}
              readOnly
            ></input>

            <input
              value={"29.1.2022"}
              type="text"
              name="date"
              autoComplete="off"
              className={classes.shiftInputDate}
              readOnly
            ></input>

            <input
              value={"ליעד אלטיף"}
              type="text"
              name="CurrentPeron"
              autoComplete="off"
              className={classes.shiftInput}
              readOnly
            ></input>

            <div className={classes.hourCont}>
              <input
                value={"17:30"}
                type="text"
                name="shiftEndTime"
                autoComplete="off"
                className={classes.shiftInputHour}
                readOnly
              ></input>

              <span>-</span>

              <input
                value={"9:00"}
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
