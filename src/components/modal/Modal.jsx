import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

const CustomModal = ({ isOpen, onClose, title, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 400); // Animatsiya tugaguncha kutish
    }
  }, [isOpen]);

  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose(); // Tashqi joy bosilganda modal yopiladi
    }
  };

  return (
    <div
      id="modal-overlay"
      className={`fixed inset-0 flex items-center justify-center bg-black/15 bg-opacity-70 z-50 transition-opacity ease-in duration-400 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-gray-900 text-white min-w-[450px] p-6 pb-0 rounded-lg shadow-lg relative transform transition-all ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* Modal header */}
        <div className="flex justify-between items-center  border-gray-600 pb-2">
          <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-100 text-[25px] hover:text-red-400 transition cursor-pointer"
          >
            <MdOutlineCancel />
          </button>
        </div>

        {/* Modal content */}
        <div className="py-2">{children}</div>
        
      </div>
    </div>
  );
};

export default CustomModal;
