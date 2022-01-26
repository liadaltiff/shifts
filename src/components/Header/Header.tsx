import classes from "./header.module.scss";
import * as React from "react";
import Popover from "@mui/material/Popover";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Autocomplete, TextField } from "@mui/material";
import { ShiftsContext } from "../../contexts/ShiftsContext";
import { UsersContext } from "../../contexts/UsersContext";
import { CookiesProvider } from "react-cookie";
import axios from "axios";

interface shiftDates {
  shiftDate: Date | undefined;
}

const Header: React.VFC<shiftDates> = ({ shiftDate }) => {
  const { stateShifts, setStateShifts } = React.useContext(ShiftsContext);
  const [fullNameUsers, setFullNameUsers] = React.useState<string[]>([]);
  const [shiftPerson, setShiftPerson] = React.useState<string>("");
  const { stateUsers, setStateUsers } = useContext(UsersContext);

  React.useEffect(() => {
    const getUsers = async () => {
      setFullNameUsers(
        stateUsers.map((user) => {
          return user.fullName;
        })
      );
    };
    getUsers();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  setLoggedInUser(loggedInUser);
  const navigate = useNavigate();

  const GoToHomePage = () => {
    setLoggedInUser(loggedInUser);
    navigate("/home");
  };

  const GoToTradesPage = () => {
    setLoggedInUser(loggedInUser);
    navigate("/trade");
  };

  const LogOut = () => {
    setLoggedInUser(undefined);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    navigate("/login");
  };

  const userINeed = stateUsers.find((user) => user.fullName === shiftPerson);

  React.useEffect(() => {
    const userINeed = stateUsers.find((user) => user.fullName === shiftPerson);
    const userId = userINeed?._id;
    const getShifts = async () => {
      if (loggedInUser) {
        try {
          if (userINeed !== undefined) {
            const resShifts = await axios.get(
              `http://localhost:5000/shifts/getShiftsByPersonId/${userId}`,
              {
                withCredentials: true,
              }
            );
            setStateShifts(resShifts.data);
          }

          if (userINeed === undefined && loggedInUser.role === "Officer") {
            const resShifts = await axios.get(
              `http://localhost:5000/shifts/getShifts`,
              {
                withCredentials: true,
              }
            );
            setStateShifts(resShifts.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    getShifts();
  }, [shiftPerson]);

  return (
    <nav className={classes.navbar}>
      <div className={classes.rightSide}>
        <button
          onClick={handleClick}
          aria-describedby={id}
          className={classes.buttonStyle}
        >
          <div className={classes.userContainer}>
            <div className={classes.logo}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className={classes.textContainer}>
              <h2>{loggedInUser?.fullName}</h2>
            </div>
          </div>
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <button
            className={classes.btnStyle}
            onClick={() => {
              GoToHomePage();
            }}
          >
            מסך הבית
          </button>
          <button
            className={classes.btnStyle}
            onClick={() => {
              GoToTradesPage();
            }}
          >
            תורנויות להצעה
          </button>
          <button
            className={classes.btnStyle}
            onClick={() => {
              LogOut();
            }}
          >
            התנתק
          </button>
        </Popover>
      </div>

      {loggedInUser?.role === "Officer" && (
        <div className={classes.leftSide}>
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
        </div>
      )}
    </nav>
  );
};

export default Header;
