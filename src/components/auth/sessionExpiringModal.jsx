import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import modalStyles from "../../util/modalStyles";
import { secondsUntilExpire } from "../../util/authToken";
import { currentToken } from "../../services/authTokenService";
import { renewLogin } from "../../services/authService";

export default function SessionExpiringModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secondsUntilExp, setSecondsUntilExp] = useState(0);
  const navigate = useNavigate();
  const showModalAtSeconds = 90;

  useEffect(() => {
    setInterval(() => {
      const token = currentToken();
      if (!token) {
        return;
      }

      const expirationInSeconds = Math.trunc(secondsUntilExpire(token));
      setSecondsUntilExp(expirationInSeconds);

      if (expirationInSeconds <= 0) {
        setIsModalOpen(false);
        return navigate("/logout");
      } else if (expirationInSeconds < showModalAtSeconds) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    }, 1000);
  }, []);

  async function handleContinueSession() {
    await renewLogin();
  }

  return (
    <Modal isOpen={isModalOpen} style={modalStyles}>
      <h2>Session Expiring</h2>
      <div className="mb-3">
        Your session is about to expire in {secondsUntilExp} seconds. Would you
        like to continue?
      </div>
      <p className="float-end">
        <button
          className="btn btn-primary me-2 ps-2 pe-2"
          onClick={handleContinueSession}
        >
          Continue
        </button>
      </p>
    </Modal>
  );
}
