import React from "react";
import Modal from "react-modal";
import ImageUpload from "../../pages/imageUpload";

interface Props {
  isModalOpen: boolean;
  modalStyles?: any;
  onCloseModal: () => void;
  onImageUploaded: () => void;
}

export default function ImageUploadModal({
  isModalOpen,
  modalStyles,
  onCloseModal,
  onImageUploaded,
}: Props) {
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
