import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
