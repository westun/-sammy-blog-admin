import React from "react";
import Modal from "react-modal";
import ImageUpload from "../../pages/imageUpload";
import { ImageDataDTO } from "./../../services/types";

interface Props {
  isModalOpen: boolean;
  modalStyles?: any;
  onCloseModal: () => void;
  onImageUploaded: (imgData: ImageDataDTO) => void;
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
