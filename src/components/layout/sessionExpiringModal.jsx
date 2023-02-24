import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import modalStyles from "../../util/modalStyles";
import { isTokenExpired, secondsUntilExpire } from "../../util/authToken";
import { currentToken } from "../../services/authTokenService";

export default function SessionExpiringModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secondsUntilExp, setSecondsUntilExp] = useState(0);
  const navigate = useNavigate();

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    const tokenInterval = setInterval(() => {
      const token = currentToken();
      if (!token) {
        return;
      }

      if (isTokenExpired(token)) {
        return;
      }

      const setSecondsInterval = setInterval(() => {
        const expirationInSeconds = Math.trunc(secondsUntilExpire(token));
        setSecondsUntilExp(expirationInSeconds);
        if (expirationInSeconds < 90) {
          setIsModalOpen(true);
        }
        if (expirationInSeconds < 0) {
          clearInterval(setSecondsInterval);
          setIsModalOpen(false);
          return navigate("/logout");
        }
        //this return statement is causing the interval function not to execute
        // return clearInterval(setSecondsInterval);
      }, 1000);

      //dispose of interval
      return clearInterval(tokenInterval);
    }, 6000);
  }, []);

  function handleContinueSession() {
    console.log("handle continue session");
  }

  return (
    <Modal isOpen={isModalOpen} style={modalStyles}>
      <h2>Session Expiring</h2>
      <div className="mb-3">
        Your session is about to expire in {secondsUntilExp} seconds, would you
        like to continue?
      </div>
      <p className="float-end">
        <button
          className="btn btn-primary me-2 ps-2 pe-2"
          onClick={handleContinueSession}
        >
          Continue
        </button>
        <button className="btn btn-danger" onClick={handleCloseModal}>
          Cancel
        </button>
      </p>
    </Modal>
  );
}
