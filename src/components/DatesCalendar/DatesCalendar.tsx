import classes from "./dates-calendar.module.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { he } from "date-fns/locale";
// import {fr} from "date-fns"
import { DatePickerCalendar, useDateInput } from "react-nice-dates";
import { ShiftsContext } from "../../contexts/ShiftsContext";
import "react-nice-dates/build/style.css";
import "react-nice-dates/build/style.css";
import "./style.css";

interface DatesCalendarProps {
  date: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}
const DatesCalendar: React.FC<DatesCalendarProps> = ({
  date,
  setSelectedDate,
}) => {
  const { stateShifts, setStateShifts } = useContext(ShiftsContext);
  // console.log("stateShifts are:", stateShifts);

  const datesss: string[] = [];

  stateShifts.map((Shift) => {
    const shiftDate = new Date(Shift.dateProp);
    console.log("check", shiftDate);
    const x = shiftDate.toLocaleDateString("fr-FR");
    datesss.push(x);
    // console.log("shiftDate is", stateShifts);
    // Shift.dateProp.toLocaleDateString("fr-FR");
    // console.log("what i need is:", Shift.dateProp.toLocaleDateString("fr-FR"));
    // console.log("propdate is:", Shift.dateProp);
  });

  const inputProps = useDateInput({
    date,
    locale: he,
    onDateChange: setSelectedDate,
  });

  const modifiers = {
    taskDay: (date: Date) =>
      datesss.some((e: string) => date.toLocaleDateString("fr-FR") == e),
  };

  const modifiersClassNames = {
    taskDay: "-taskDay",
    bigFont: "-bigFont",
  };

  // console.log("normal date", date?.toLocaleDateString());

  // let tasksDates = [new Date("01/26/2022")];
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  if (loggedInUser) {
    setLoggedInUser(loggedInUser);
  }
  return (
    <div>
      <div className={classes.dateCalendar}>
        <DatePickerCalendar
          date={date}
          onDateChange={setSelectedDate}
          locale={he}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
      </div>
    </div>
  );
};

export default DatesCalendar;
