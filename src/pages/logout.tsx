import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      async function logoutUser() {
        await logout();
      }

      logoutUser();
      navigate("/login");
    }, 3000);
  }, []);

  return (
    <React.Fragment>
      <h1>You are being logged out, please wait...</h1>
    </React.Fragment>
  );
}
