import axios from "axios";
import getDate from "date-fns/getDate";
import { FC, useState, useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ShiftContext } from "../../contexts/ShiftContext";
import { UserContext } from "../../contexts/UserContext";
import { Shift } from "../../types/shift.interface";
import { responseOk } from "../../utils/axios.util";
import classes from "./view-shift.module.scss";

interface shiftDates {
  shiftDate: Date | undefined;
}

const ErrorText = () => {
  return <></>;
};

const ViewShift: FC<shiftDates> = ({ shiftDate }) => {
  const { stateShift, setStateShift } = useContext(ShiftContext);

  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setStateShift(undefined);
  }, []);

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  if (loggedInUser) {
    setLoggedInUser(loggedInUser);
  }
  const getDate = shiftDate?.toISOString();
  // console.log("the date is", getDate);

  const tradeCurrentShift = useCallback(() => {
    console.log("got here");

    const sendRequest = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:5000/shifts/date/${getDate}/trade`,
          { traded: true }
        );
        Swal.fire({
          icon: "success",
          title: "התורנות נשלחה לעמוד ההחלפות בהצלחה",
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
  }, [getDate]);

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
              value={shiftDate?.toLocaleDateString("he-IL")}
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
                onClick={tradeCurrentShift}
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
