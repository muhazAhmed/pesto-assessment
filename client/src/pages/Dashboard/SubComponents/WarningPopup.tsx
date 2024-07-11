import { FC } from "react";
import PopupModal from "../../../components/PopupModal/PopupModal";
import {
  closeModal,
  newLocalStorage,
  openModal,
} from "../../../utils/commonFunctions";

interface ModalProps {
  setModal: any;
  setFormModal: any;
}

const WarningPopup: FC<ModalProps> = ({ setModal, setFormModal }) => {
  const handleClick = () => {
    closeModal(setModal);
    setTimeout(() => {
      openModal(setFormModal);
    }, 500);
    newLocalStorage("1rfg3", false);
    newLocalStorage("dfd433", true);
  };

  return (
    <PopupModal setModal={setModal}>
      <div className="delete-modal" style={{ width: "fit-content" }}>
        <h3 style={{ width: "fit-content", textAlign: "center" }}>
          This is a demonstration version. <br />
          Please <span>log in</span> to save your changes, <br />
          as any modifications made here will not be preserved
        </h3>
        <div className="buttons">
          <button
            onClick={handleClick}
            data-title="Redirects to login page"
            style={{ backgroundColor: "var(--primary)", color: "#ffff" }}
          >
            Okay!
          </button>
        </div>
      </div>
    </PopupModal>
  );
};

export default WarningPopup;
