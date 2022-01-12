import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { UsersProvider } from "./contexts/UsersContext";
import { ShiftProvider } from "./contexts/ShiftContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <UserProvider>
          <ShiftProvider>
            <App />
          </ShiftProvider>
        </UserProvider>
      </UsersProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
// document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
