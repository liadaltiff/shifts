import axios from "axios";
import { FC, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./view-shift.module.scss";

interface dateProps {
  dateProp: Date | undefined;
}

const ErrorText = () => {
  return <></>;
};

const ViewShift: FC<dateProps> = ({ dateProp }) => {
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
              className={classes.shiftDateInput}
              readOnly
            ></input>

            <label>שם התורנות</label>
            <input
              type="text"
              name="PersonalNumber"
              value={_id}
              autoComplete="off"
              onChange={(e) => {
                setId(e.currentTarget.value);
              }}
              className={classes.shiftNameInput}
            ></input>

            <label>שעת התחלה</label>
            <input
              type="password"
              name="Password"
              value={password}
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              className={classes.shiftStartTimeInput}
            ></input>

            <label>שעת סיום</label>
            <input
              type="password"
              name="Password"
              value={password}
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              className={classes.shiftEndTimeInput}
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
