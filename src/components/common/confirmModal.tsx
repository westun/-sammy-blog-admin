import Modal from "react-modal";
import compactModalStyles from "../../util/modalStyles";

interface Props {
  header: string;
  body: string;
  isModalOpen: boolean;
  modalStyles?: any;
  onClickOk: () => void;
  onClickCancel: () => void;
}

export default function ConfirmModal({
  header,
  body,
  isModalOpen,
  modalStyles,
  onClickOk,
  onClickCancel,
}: Props) {
  return (
    <Modal isOpen={isModalOpen} style={modalStyles || compactModalStyles}>
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
    </Modal>
  );
}
