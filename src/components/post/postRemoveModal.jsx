import React from "react";
import Modal from "react-modal";

export default function PostRemoveModal({
  isModalOpen,
  modalStyles,
  onRemovePost,
  onCloseModal,
}) {
  return (
    <Modal isOpen={isModalOpen} style={modalStyles}>
      <h2>Are you sure?</h2>
      <div className="mb-3">Are you sure you want to remove this post?</div>
      <p className="float-end">
        <button className="btn btn-primary me-2" onClick={onRemovePost}>
          Ok
        </button>
        <button className="btn btn-danger" onClick={onCloseModal}>
          Cancel
        </button>
      </p>
    </Modal>
  );
}
