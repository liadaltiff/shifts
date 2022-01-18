import classes from "./trade-shifts.module.scss";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "react-nice-dates/build/style.css";
import Header from "../../components/Header/Header";
import DatesCalendar from "../../components/DatesCalendar/DatesCalendar";
import "react-nice-dates/build/style.css";
import ShiftTradeCard from "../../components/ShiftTradeCard/ShiftTradeCard";

interface dateProps {
  dateProp: Date | undefined;
}

const TradeShifts = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  if (loggedInUser) {
    setLoggedInUser(loggedInUser);
  }

  // console.log("dateinput:", inputProps.value);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header dateProp={undefined} />
      </div>
      <div className={classes.cards}>
        <ShiftTradeCard />
      </div>
    </div>
  );
};

export default TradeShifts;
