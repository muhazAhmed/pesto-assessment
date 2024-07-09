import "./style.scss";
import PopupModal from "../../../components/PopupModal/PopupModal";
import { FC } from "react";
import { closeModal } from "../../../utils/commonFunctions";

interface PopupModalProps {
  setModal: any;
  userInfo?: any;
}

const DeleteModal: FC<PopupModalProps> = ({ setModal, userInfo }) => {
  return (
    <PopupModal setModal={setModal}>
      <div className="delete-modal">
        <h3>
          Are Sure want to <span>Delete</span> this item
        </h3>
        <div className="buttons">
          <button onClick={() => console.log(userInfo)}>Delete</button>
          <button onClick={() => closeModal(setModal)}>Cancel</button>
        </div>
      </div>
    </PopupModal>
  );
};

export default DeleteModal;
