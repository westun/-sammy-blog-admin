import React from "react";
import ReactModal from "react-modal";

export default function Modal({
  header,
  body,
  isModalOpen,
  modalStyles,
  onClickOk,
  onClickCancel,
}) {
  <ReactModal isOpen={isModalOpen} style={modalStyles}>
    <h2>{header}</h2>
    <div className="mb-3">{body}</div>
    <p className="float-end">
      <button className="btn btn-primary me-2" onClick={onClickOk}>
        Ok
      </button>
      <button className="btn btn-danger" onClick={onClickCancel}>
        Cancel
      </button>
    </p>
  </ReactModal>;
}
