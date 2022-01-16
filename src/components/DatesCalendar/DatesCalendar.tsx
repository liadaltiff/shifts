import classes from "./dates-calendar.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { he } from "date-fns/locale";
// import {fr} from "date-fns"
import { DatePickerCalendar, useDateInput } from "react-nice-dates";
import { ShiftsContext } from "../../contexts/ShiftsContext";
import "react-nice-dates/build/style.css";
import "react-nice-dates/build/style.css";
import "./style.css";
import axios from "axios";
import { ShiftContext } from "../../contexts/ShiftContext";

interface DatesCalendarProps {
  date: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const ErrorText = () => {
  return <></>;
};

const DatesCalendar: React.FC<DatesCalendarProps> = ({
  date,
  setSelectedDate,
}) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  if (loggedInUser) {
    setLoggedInUser(loggedInUser);
  }

  const fullName = loggedInUser?.fullName;
  const { stateShifts, setStateShifts } = useContext(ShiftsContext);
  const { stateShift, setStateShift } = useContext(ShiftContext);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getShifts = async () => {
      if (loggedInUser) {
        try {
          if (loggedInUser.role === "Officer") {
            const resShifts = await axios.get(`http://localhost:5000/shifts`);
            setStateShifts(resShifts.data);
          }

          if (loggedInUser.role === "Soldier") {
            const resShifts = await axios.get(
              `http://localhost:5000/shifts/shiftperson/${fullName}`
            );
            setStateShifts(resShifts.data);
          }
        } catch (error) {
          setIsError(true);
        }
      }
    };

    getShifts();
  }, []);

  const shiftDates: string[] = [];
  // console.log("stateshifts:", stateShifts);

  stateShifts.map((shift) => {
    const shiftDate = new Date(shift.dateProp);
    const convertedDate = shiftDate.toLocaleDateString("fr-FR");
    shiftDates.push(convertedDate);
  });

  const GetAllShiftProps = async (date: Date) => {
    const resSelectedShift = await axios.get(
      `http://localhost:5000/shifts/date/${date.toISOString()}`
    );

    setStateShift(resSelectedShift.data[0]);

    if (stateShift !== undefined) {
      console.log("the selected shift name is:", stateShift.shiftName);
    }
  };

  const inputProps = useDateInput({
    date,
    locale: he,
    onDateChange: setSelectedDate,
  });

  const modifiers = {
    taskDay: (date: Date) =>
      shiftDates.some((e: string) => date.toLocaleDateString("fr-FR") == e),
  };

  const modifiersClassNames = {
    taskDay: "-taskDay",
    bigFont: "-bigFont",
  };

  const CombineTwoFuncs = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      GetAllShiftProps(date);
    }
  };

  return (
    <div>
      <div className={classes.dateCalendar}>
        <DatePickerCalendar
          date={date}
          onDateChange={(e) => CombineTwoFuncs(e)}
          locale={he}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
      </div>
    </div>
  );
};

export default DatesCalendar;
