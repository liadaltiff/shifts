import classes from "./home-page.module.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { format } from "date-fns";
import { enGB, he } from "date-fns/locale";
import { DatePickerCalendar, useDateInput } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import Header from "../../components/Header/Header";
import MakeShift from "../../components/MakeShift/MakeShift";
import ViewShift from "../../components/ViewShift/ViewShift";

const HomePage = () => {
  const [date, setDate] = useState<Date>();

  const inputProps = useDateInput({
    date,
    format: "dd-MM-yyyy",
    locale: he,
    onDateChange: setDate,
  });

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  if (loggedInUser) {
    setLoggedInUser(loggedInUser);
  }

  console.log("dateinput:", inputProps.value);

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.header}>
          <Header />
        </div>
      </div>
      <div className={classes.grid}>
        <div className={classes.dateCalendar}>
          <DatePickerCalendar date={date} onDateChange={setDate} locale={he} />
        </div>
        {loggedInUser && (
          <div className={classes.shift}>
            {loggedInUser.role === "Soldier" && (
              <ViewShift dateProp={inputProps.value || ""} />
            )}
            {loggedInUser.role === "Officer" && (
              <MakeShift dateProp={inputProps.value || ""} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
