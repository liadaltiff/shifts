import React, { useEffect } from "react";
import classes from "./make-shift.module.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useMakeShift } from "./useMakeShift";

interface shiftDates {
  shiftDate: Date | undefined;
}

const MakeShift: React.VFC<shiftDates> = ({ shiftDate }) => {
  const { form } = useMakeShift(shiftDate);

  useEffect(() => {}, [shiftDate]);

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
              value={shiftDate?.toLocaleDateString("he-IL")}
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
              value={form.data.name}
              autoComplete="off"
              onChange={(e) => {
                form.setField("name", e.currentTarget.value);
              }}
              className={classes.inputStyle}
            ></TextField>

            <label>בחירת תורן</label>

            {/* <span>{form.data.person?.fullName}</span> */}
            <Autocomplete
              value={form.data.person}
              disablePortal
              options={form.users}
              getOptionLabel={(option) => option.fullName || ""}
              className={classes.inputStyle}
              onChange={(event, value) => {
                form.setPersonField(value?._id ?? "");
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            <label>שעת התחלה</label>
            <TextField
              onChange={(e) => form.setTimeField("start", e)}
              className={classes.inputStyle}
              id="time"
              type="time"
              value={form.data.time.start}
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
              onChange={(e) => form.setTimeField("end", e)}
              className={classes.inputStyle}
              id="time"
              type="time"
              value={form.data.time.end}
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
                onClick={form.post}
                className={classes.createShift}
              >
                צור תורנות
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default MakeShift;
