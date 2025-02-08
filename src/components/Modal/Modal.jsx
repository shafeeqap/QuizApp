import ReactDOM from "react-dom";
import "./Modal.css";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cls-btn-warpper">
          <div className="modal-close" onClick={onClose}>
            <IoMdClose />
          </div>
        </div>

        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-actions">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
