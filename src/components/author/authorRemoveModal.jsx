import React from "react";
import Modal from "react-modal";

export default function AuthorRemoveModal({
  isModalOpen,
  modalStyles,
  onRemoveAuthor,
  onCloseModal,
}) {
  return (
    <Modal isOpen={isModalOpen} style={modalStyles}>
      <h2>Are you sure?</h2>
      <div className="mb-3">Are you sure you want to remove this author?</div>
      <p className="float-end">
        <button className="btn btn-primary me-2" onClick={onRemoveAuthor}>
          Ok
        </button>
        <button className="btn btn-danger" onClick={onCloseModal}>
          Cancel
        </button>
      </p>
    </Modal>
  );
}
