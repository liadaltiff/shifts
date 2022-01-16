import axios from "axios";
import React, { FC, useState, useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";
import { User } from "../../types/user.interface";
import classes from "./make-shift.module.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface dateProps {
  dateProp: Date | undefined;
}

const ErrorText = () => {
  return <></>;
};

const MakeShift: React.VFC<dateProps> = ({ dateProp }) => {
  const [shiftName, setShiftName] = useState("");
  const [shiftPerson, setShiftPerson] = useState<string>("");

  const [startTimeValue, setStartTimeValue] = useState("09:00");
  const startTimeHandleChange = (e: any) => {
    setStartTimeValue(e.target.value);
  };

  const [endTimeValue, setEndTimeValue] = useState("12:00");
  const endTimeHandleChange = (e: any) => {
    setEndTimeValue(e.target.value);
  };

  const [fullNameUsers, setFullNameUsers] = useState<string[]>([]);
  const { stateUsers, setStateUsers } = useContext(UsersContext);

  useEffect(() => {
    const getUsers = async () => {
      setFullNameUsers(
        stateUsers.map((user) => {
          return user.fullName;
        })
      );
    };
    getUsers();
  }, []);

  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const createShift = useCallback(() => {
    const sendRequest = async () => {
      try {
        const response = await axios.post("http://localhost:5000/shifts", {
          dateProp,
          shiftName,
          shiftPerson,
          startTimeValue,
          endTimeValue,
        });

        if (response.status >= 200 && response.status <= 399) {
          //   console.log("got here");
        } else if (response.status > 399) {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      }
    };

    sendRequest();
  }, [dateProp, shiftName, shiftPerson, startTimeValue, endTimeValue]);

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <h1 className={classes.registerText}>תורנות</h1>

        <form>
          <div className={classes.inputContainer}>
            <label>תאריך התורנות</label>
            <TextField
              type="text"
              name="date"
              value={dateProp?.toLocaleDateString("he-IL")}
              autoComplete="off"
              className={classes.inputStyle}
              disabled
              InputProps={{
                inputProps: {
                  style: { textAlign: "center" },
                },
              }}
            ></TextField>
            <label>שם התורנות</label>
            <TextField
              type="text"
              name="shiftName"
              value={shiftName}
              autoComplete="off"
              onChange={(e) => {
                setShiftName(e.currentTarget.value);
              }}
              className={classes.inputStyle}
            ></TextField>
            <label>בחירת תורן</label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={fullNameUsers}
              className={classes.inputStyle}
              onChange={(event, value) =>
                value ? setShiftPerson(value) : setShiftPerson("")
              }
              renderInput={(params) => <TextField {...params} />}
            />
            <label>שעת התחלה</label>
            <TextField
              onChange={startTimeHandleChange}
              className={classes.inputStyle}
              id="time"
              type="time"
              defaultValue="09:00"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              InputProps={{
                inputProps: {
                  style: { textAlign: "right" },
                },
              }}
            />
            <label>שעת סיום</label>
            <TextField
              onChange={endTimeHandleChange}
              className={classes.inputStyle}
              id="time"
              type="time"
              defaultValue="12:00"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              InputProps={{
                inputProps: {
                  style: { textAlign: "right" },
                },
              }}
            />
            <div className={classes.buttonContainer}>
              <button
                type="button"
                onClick={createShift}
                className={classes.createShift}
              >
                צור תורנות
              </button>
            </div>
          </div>
        </form>

        {isError && <ErrorText />}
      </div>
    </div>
  );
};
export default MakeShift;
