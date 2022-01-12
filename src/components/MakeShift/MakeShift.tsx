import axios from "axios";
import React, { FC, useState, useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";
import { User } from "../../types/user.interface";
import classes from "./make-shift.module.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface dateProps {
  dateProp: string;
}

const ErrorText = () => {
  return <></>;
};

const MakeShift: React.VFC<dateProps> = ({ dateProp }) => {
  const [startTimeValue, setStartTimeValue] = useState("");
  const startTimeHandleChange = (e: any) => {
    setStartTimeValue(e.target.value);
  };
  console.log("start time:", startTimeValue);

  const [endTimeValue, setEndTimeValue] = useState("");
  const endTimeHandleChange = (e: any) => {
    setEndTimeValue(e.target.value);
  };
  console.log("end time:", endTimeValue);

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

  const [shiftName, setShiftName] = useState("");
  const [_id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const CreateShift = useCallback(() => {
    const sendrequest = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/users", {
          shiftName,
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
  }, [shiftName, _id, password]);

  console.log();

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
              value={dateProp}
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
              name="PersonalNumber"
              value={_id}
              autoComplete="off"
              onChange={(e) => {
                setId(e.currentTarget.value);
              }}
              className={classes.inputStyle}
            ></TextField>
            <label>בחירת תורן</label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={fullNameUsers}
              className={classes.inputStyle}
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
                onClick={CreateShift}
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
