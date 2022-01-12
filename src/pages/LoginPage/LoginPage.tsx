import { FC, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./login-page.module.scss";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { UsersContext } from "../../contexts/UsersContext";

const ErrorText = () => {
  return (
    <h2 className={classes.errorText}>המספר האישי או הסיסמה אינם נכונים</h2>
  );
};

const LoginPage: FC = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { stateUsers, setStateUsers } = useContext(UsersContext);

  const { state } = useLocation();

  const [_id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const Login = async (_id: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        _id,
        password,
      });

      if (response.statusText === "OK") {
        const res = await axios.get(`http://localhost:5000/users`);
        setStateUsers(res.data);
        setLoggedInUser(response.data);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      navigate("/home");
    }
  }, [loggedInUser]);

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <h1 className={classes.loginText}>התחברות</h1>
        <form>
          <div className={classes.inputContainer}>
            <label>מספר אישי</label>
            <input
              type="text"
              name="PersonalNumber"
              autoComplete="off"
              value={_id}
              onChange={(e) => {
                setId(e.currentTarget.value);
              }}
              className={classes.personalNumberInput}
            ></input>
            <label>סיסמה</label>
            <input
              type="password"
              name="Password"
              autoComplete="off"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              className={classes.passwordInput}
            ></input>

            <button
              type="button"
              onClick={() => Login(_id, password)}
              className={classes.loginButton}
            >
              התחבר
            </button>
          </div>
          <button
            type="button"
            className={classes.registerButton}
            onClick={() => navigate(`/register`)}
          >
            לא רשום למערכת? הרשם כאן
          </button>
        </form>
        {isError && <ErrorText />}
      </div>
    </div>
  );
};
export default LoginPage;
