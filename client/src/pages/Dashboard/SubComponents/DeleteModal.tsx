import "./style.scss";
import PopupModal from "../../../components/PopupModal/PopupModal";
import { FC } from "react";
import { closeModal, logout } from "../../../utils/commonFunctions";
import { useNavigate } from "react-router-dom";

interface PopupModalProps {
  setModal: any;
  taskInfo?: any;
  page: string;
}

const DeleteModal: FC<PopupModalProps> = ({ setModal, taskInfo, page }) => {
  const navigate = useNavigate();

  const handleButton = async () => {
    if (page == "logout") {
      return logout(navigate);
    } else {
      // ====
    }
  };

  return (
    <PopupModal setModal={setModal}>
      <div className="delete-modal">
        <h3>
          Are you sure you want to
          {page === "delete" ? (
            <>
              <span>Delete</span> this item
            </>
          ) : (
            <span> logout</span>
          )}
          ?
        </h3>
        <div className="buttons">
          <button onClick={handleButton}>
            {page == "delete" ? "Delete" : "Logout"}
          </button>
          <button onClick={() => closeModal(setModal)}>Cancel</button>
        </div>
      </div>
    </PopupModal>
  );
};

export default DeleteModal;
