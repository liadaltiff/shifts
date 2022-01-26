import axios from "axios";
import { FC, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./register-page.module.scss";

const ErrorText = () => {
  return (
    <h2 className={classes.errorText}>המספר האישי שהזנת כבר קיים במערכת</h2>
  );
};

const RegisterPage: FC = () => {
  const [fullName, setFullName] = useState("");
  const [_id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  //"http://localhost:5000/auth/register"
  const CreateUser = useCallback(() => {
    const sendrequest = async () => {
      try {
        let role = "Soldier";
        const response = await axios.post(
          "http://localhost:5000/users/createUser",
          {
            fullName,
            _id,
            role,
            password,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status >= 200 && response.status <= 399) {
          navigate(`/login`);
        } else if (response.status > 399) {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      }
    };

    sendrequest();
  }, [fullName, _id, password]);

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <h1 className={classes.registerText}>הרשמה</h1>

        <form>
          <div className={classes.inputContainer}>
            <label>שם מלא</label>
            <input
              type="text"
              name="FullName"
              value={fullName}
              autoComplete="off"
              onChange={(e) => {
                setFullName(e.currentTarget.value);
              }}
              className={classes.fullNameInput}
            ></input>
            <label>מספר אישי</label>
            <input
              type="text"
              name="PersonalNumber"
              value={_id}
              autoComplete="off"
              onChange={(e) => {
                setId(e.currentTarget.value);
              }}
              className={classes.personalNumberInput}
            ></input>
            <label>סיסמה</label>
            <input
              type="password"
              name="Password"
              value={password}
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              className={classes.passwordInput}
            ></input>

            <button
              type="button"
              onClick={CreateUser}
              className={classes.registerButton}
            >
              הרשם
            </button>
          </div>
          <button
            type="button"
            className={classes.loginButton}
            onClick={() => navigate(`/login`)}
          >
            רשום למערכת? התחבר כאן
          </button>
        </form>
        {isError && <ErrorText />}
      </div>
    </div>
  );
};
export default RegisterPage;
