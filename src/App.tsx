import { useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import { UserContext } from "./contexts/UserContext";
import { getUser } from "./api/users";
import TradeShifts from "./pages/TradeShifts/TradeShifts";

export default function App() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  useEffect(() => {
    async function updateUser() {
      if (loggedInUser) {
        const user = await getUser(loggedInUser._id);
        if (user) {
          setLoggedInUser(user);
        }
      }
    }
    updateUser();
  }, [getUser, setLoggedInUser]);

  return (
    <>
      {loggedInUser ? (
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/trade" element={<TradeShifts />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}
