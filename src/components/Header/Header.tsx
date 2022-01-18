import classes from "./header.module.scss";
import * as React from "react";
import Popover from "@mui/material/Popover";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Autocomplete, TextField } from "@mui/material";

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
    navigate("/login");
  };

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

      <div className={classes.leftSide}>
        {/* <Autocomplete
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
            /> */}
      </div>
    </nav>
  );
};

export default Header;
