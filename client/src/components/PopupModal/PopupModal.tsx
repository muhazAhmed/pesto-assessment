import React, { FC } from "react";
import { motion } from "framer-motion";
import "./style.scss";
import { closeModal } from "../../utils/commonFunctions";

interface ModalProps {
  setModal: (value: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

const PopupModal: FC<ModalProps> = ({ setModal, children, className }) => {
  return (
    <motion.div
      className={`custom-modal ${className ? className : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="modal-content">
        <i
          data-title="Close"
          className="fa-solid fa-close"
          onClick={() => closeModal(setModal)}
        ></i>
        {children}
      </div>
    </motion.div>
  );
};

export default PopupModal;
