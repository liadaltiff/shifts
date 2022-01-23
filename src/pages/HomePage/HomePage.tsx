import classes from "./home-page.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import "react-nice-dates/build/style.css";
import Header from "../../components/Header/Header";
import DatesCalendar from "../../components/DatesCalendar/DatesCalendar";
import "react-nice-dates/build/style.css";
import ViewShift from "../../components/ViewShift/ViewShift";
import MakeShift from "../../components/MakeShift/MakeShift";

const HomePage: React.FC = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [date, setDate] = useState<Date>();

  if (loggedInUser) {
    setLoggedInUser(loggedInUser);
  }

  useEffect(() => {}, [date]);

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.header}>
          <Header shiftDate={undefined} />
        </div>
      </div>

      <div className={classes.grid}>
        <DatesCalendar date={date} setSelectedDate={setDate} />
        {loggedInUser && (
          <div className={classes.shift}>
            {loggedInUser.role === "Soldier" && <ViewShift shiftDate={date} />}
            {loggedInUser.role === "Officer" && <MakeShift shiftDate={date} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
