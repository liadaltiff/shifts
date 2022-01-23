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
import { Shift } from "../../types/shift.interface";
import { responseOk } from "../../utils/axios.util";
import { ShiftsTradeContext } from "../../contexts/ShiftsTradeContext";

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

  const userId = loggedInUser?._id;
  const { stateTradeShifts, setStateTradeShifts } =
    useContext(ShiftsTradeContext);
  const { stateShifts, setStateShifts } = useContext(ShiftsContext);
  const { stateShift, setStateShift } = useContext(ShiftContext);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getShifts = async () => {
      if (loggedInUser) {
        try {
          const resShifts = await axios.get(`http://localhost:5000/shifts`, {
            withCredentials: true,
          });
          setStateTradeShifts(resShifts.data);

          if (loggedInUser.role === "Officer") {
            const resShifts = await axios.get(`http://localhost:5000/shifts`, {
              withCredentials: true,
            });
            setStateShifts(resShifts.data);
          }

          if (loggedInUser.role === "Soldier") {
            const resShifts = await axios.get(
              `http://localhost:5000/shifts/shiftperson/${userId}`,
              {
                withCredentials: true,
              }
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

  stateShifts.map((shift) => {
    const shiftDate = new Date(shift.shiftDate);
    const convertedDate = shiftDate.toLocaleDateString("fr-FR");
    shiftDates.push(convertedDate);
  });

  const getCurrentShift = async (date: Date): Promise<Shift | undefined> => {
    try {
      const response = await axios.get(
        `http://localhost:5000/shifts/date/${date.toISOString()}`,
        {
          withCredentials: true,
        }
      );

      if (responseOk(response)) {
        return response.data;
      } else {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }
  };

  const inputProps = useDateInput({
    date,
    locale: he,
    onDateChange: setSelectedDate,
  });

  const modifiers = {
    // disabled: (date: Date) =>
    //   shiftDates.some((e: string) => date.toLocaleDateString("fr-FR") == e),
    taskDay: (date: Date) =>
      shiftDates.some((e: string) => date.toLocaleDateString("fr-FR") == e),
    bigFont: (date: Date) => true,
  };

  const modifiersClassNames = {
    taskDay: "-taskDay",
    bigFont: "-bigFont",
  };

  const handleDateChange = async (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const shift = await getCurrentShift(date);
      setStateShift(shift);
    }
  };

  return (
    <div>
      <div className={classes.dateCalendar}>
        <DatePickerCalendar
          date={date}
          onDateChange={(e) => handleDateChange(e)}
          locale={he}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
      </div>
    </div>
  );
};

export default DatesCalendar;
