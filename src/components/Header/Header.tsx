import classes from "./header.module.scss";
import * as React from "react";
import Popover from "@mui/material/Popover";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
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

  const LogOut = () => {
    setLoggedInUser(undefined);
    navigate("/login");
  };

  return (
    <nav className={classes.navbar}>
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
          className={classes.logOut}
          onClick={() => {
            LogOut();
          }}
        >
          התנתק
        </button>
      </Popover>
    </nav>
  );
};

export default Header;
