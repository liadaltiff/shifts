import axios from "axios";
import React, { FC, useState, useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";
import { User } from "../../types/user.interface";
import classes from "./make-shift.module.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ShiftContext } from "../../contexts/ShiftContext";
import { useMakeShift } from "./useMakeShift";

interface dateProps {
  dateProp: Date | undefined;
}

const MakeShift: React.VFC<dateProps> = ({ dateProp }) => {
  const { form } = useMakeShift(dateProp);

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
              value={form.data.name}
              autoComplete="off"
              onChange={(e) => {
                form.setField("name", e.currentTarget.value);
              }}
              className={classes.inputStyle}
            ></TextField>

            <label>בחירת תורן</label>
            <Autocomplete
              value={form.data.person}
              disablePortal
              id="combo-box-demo"
              options={form.users}
              getOptionLabel={(option) => option.fullName}
              className={classes.inputStyle}
              onChange={(event, value) => {
                form.setField("person", value ?? "");
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
              onChange={(e) => form.setTimeField("end", e)}
              className={classes.inputStyle}
              id="time"
              type="time"
              value={form.data.time.end}
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
