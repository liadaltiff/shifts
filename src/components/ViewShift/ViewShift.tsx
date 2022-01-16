import axios from "axios";
import { FC, useState, useCallback, useContext } from "react";
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
  setStateShift(stateShift);

  // BADDDDDD
  const [fullName, setFullName] = useState("");
  const [_id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const CreateShift = useCallback(() => {
    const sendrequest = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/users", {
          fullName,
          _id,
          password,
        });

        if (response.status >= 200 && response.status <= 399) {
          navigate(`/login`);
        } else if (response.status > 399) {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      }
    };

    sendrequest();
  }, [fullName, _id, password]);

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
                onClick={CreateShift}
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
