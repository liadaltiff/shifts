import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { UsersProvider } from "./contexts/UsersContext";
import { ShiftProvider } from "./contexts/ShiftContext";
import { ShiftsProvider } from "./contexts/ShiftsContext";
import { ShiftsTradeProvider } from "./contexts/ShiftsTradeContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <UsersProvider>
          <ShiftProvider>
            <ShiftsTradeProvider>
              <ShiftsProvider>
                <App />
              </ShiftsProvider>
            </ShiftsTradeProvider>
          </ShiftProvider>
        </UsersProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
// document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
