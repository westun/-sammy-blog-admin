import React from "react";
import Modal from "react-modal";
import ImageUpload from "../../pages/imageUpload";

export default function ImageUploadModal({
  isModalOpen,
  modalStyles,
  onCloseModal,
  onImageUploaded,
}) {
  return (
    <Modal isOpen={isModalOpen} style={modalStyles}>
      <p>
        <button className="btn btn-danger" onClick={onCloseModal}>
          Close
        </button>
      </p>
      <ImageUpload onImageUploaded={onImageUploaded} />
    </Modal>
  );
}
