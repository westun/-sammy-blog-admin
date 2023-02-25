import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import modalStyles from "../../util/modalStyles";
import { secondsUntilExpire } from "../../util/authToken";
import { currentToken } from "../../services/authTokenService";

export default function SessionExpiringModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secondsUntilExp, setSecondsUntilExp] = useState(0);
  const [cancelExtendSession, setCancelExtendSession] = useState(false);
  const [secondsInterval, setSecondsInterval] = useState(null);
  const navigate = useNavigate();

  function handleCloseModal() {
    setIsModalOpen(false);
    setCancelExtendSession(true);
  }

  // designed like this to allow buttons like "Cancel" or "Continue" to actually do work,
  // like close the modal, and keep it closed.
  // Otherwise it seems to run forever, sometimes with multiple interval instances.
  useEffect(() => {
    setSecondsInterval(
      setInterval(() => {
        const token = currentToken();
        if (!token) {
          return;
        }

        const expirationInSeconds = Math.trunc(secondsUntilExpire(token));
        setSecondsUntilExp(expirationInSeconds);

        const sessionHasExpired = expirationInSeconds <= 0;
        if (cancelExtendSession && !sessionHasExpired) {
          setIsModalOpen(false);
          clearInterval(secondsInterval);
          return;
        }

        if (expirationInSeconds <= 0) {
          setIsModalOpen(false);
          clearInterval(secondsInterval);
          return navigate("/logout");
        } else if (expirationInSeconds < 90) {
          setIsModalOpen(true);
        }
      }, 1000)
    );
  }, [cancelExtendSession]);

  // function handleContinueSession() {
  //   console.log("handle continue session");
  // }

  return (
    <Modal isOpen={isModalOpen} style={modalStyles}>
      <h2>Session Expiring</h2>
      <div className="mb-3">
        Your session is about to expire in {secondsUntilExp} seconds. Please
        save any work before you are logged out.
        {/* , would you like to continue? */}
      </div>
      <p className="float-end">
        {/* <button
          className="btn btn-primary me-2 ps-2 pe-2"
          onClick={handleContinueSession}
        >
          Continue
        </button> */}
        <button className="btn btn-danger" onClick={handleCloseModal}>
          Close
        </button>
      </p>
    </Modal>
  );
}
