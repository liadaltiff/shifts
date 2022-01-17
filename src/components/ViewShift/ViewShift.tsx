import axios from "axios";
import getDate from "date-fns/getDate";
import { FC, useState, useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShiftContext } from "../../contexts/ShiftContext";
import classes from "./view-shift.module.scss";

interface dateProps {
  dateProp: Date | undefined;
}

const ErrorText = () => {
  return <></>;
};

const ViewShift: FC<dateProps> = ({ dateProp }) => {
  const { stateShift, setStateShift } = useContext(ShiftContext);

  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setStateShift(undefined);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <h1 className={classes.registerText}>תורנות</h1>

        <form>
          <div className={classes.inputContainer}>
            <label>תאריך התורנות</label>
            <input
              type="text"
              name="date"
              value={dateProp?.toLocaleDateString("he-IL")}
              autoComplete="off"
              className={classes.shiftInput}
              readOnly
            ></input>

            <label>שם התורנות</label>
            <input
              type="text"
              name="shiftName"
              value={stateShift?.shiftName || "לא שובצת בתורנות בתאריך זה"}
              autoComplete="off"
              className={classes.shiftInput}
              readOnly
            ></input>

            <label>שעת התחלה</label>
            <input
              type="text"
              name="shiftStartTime"
              value={stateShift?.startTimeValue || "לא שובצת בתורנות בתאריך זה"}
              autoComplete="off"
              className={classes.shiftInput}
              readOnly
            ></input>

            <label>שעת סיום</label>
            <input
              type="text"
              name="shiftEndTime"
              value={stateShift?.endTimeValue || "לא שובצת בתורנות בתאריך זה"}
              autoComplete="off"
              className={classes.shiftInput}
              readOnly
            ></input>

            <div className={classes.buttonContainer}>
              <button
                type="button"
                // onClick={CreateShift}
                className={classes.createShift}
              >
                החלף תורנות
              </button>
            </div>
          </div>
        </form>

        {isError && <ErrorText />}
      </div>
    </div>
  );
};
export default ViewShift;
