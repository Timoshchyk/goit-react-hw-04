import Modal from "react-modal";
import css from "./ImageModal.module.css";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: "none",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    backgroundColor: "transparent",
  },
};

Modal.setAppElement("#root");

function ImageModal({ onClose, modalIsOpen, urlBig, alt }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      style={customStyles}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <img src={urlBig} alt={alt} className={css.full} />
    </Modal>
  );
}
export default ImageModal;
