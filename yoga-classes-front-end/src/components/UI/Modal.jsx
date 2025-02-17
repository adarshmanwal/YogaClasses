import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  // Close modal on backdrop click
  useEffect(() => {
    const handleBackdropClick = (event) => {
      if (event.target === dialog.current) {
        onClose();
      }
    };

    const dialogElement = dialog.current;
    dialogElement?.addEventListener("click", handleBackdropClick);
    return () =>
      dialogElement?.removeEventListener("click", handleBackdropClick);
  }, [onClose]);

  return createPortal(
    <dialog
      ref={dialog}
      onCancel={onClose} // Allow escape key to close
      className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-xl shadow w-11/12 max-w-md backdrop:bg-black/50"
    >
      <button
        className="absolute top-2 right-2 p-1 rounded-lg text-gray-300 bg-white hover:bg-gray-50 hover:text-blue-950"
        onClick={onClose}
      >
        X
      </button>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
