import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, open}) {
  const dialog = useRef();

 useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className="p-4 rounded-lg shadow-md">
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}