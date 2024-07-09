import { FC } from "react";
import PopupModal from "../../../components/PopupModal/PopupModal";
import "./style.scss";
import { closeModal } from "../../../utils/commonFunctions";

interface EditModalProps {
  setShowModal: any;
  page: string;
}

const EditModal: FC<EditModalProps> = ({ setShowModal, page }) => {
  return (
    <PopupModal setModal={setShowModal}>
      <div className="modal-body">
        <div className="item">
          <label>Title:</label>
          <input type="text" placeholder="Enter Title" />
        </div>
        <div className="item">
          <label>Description:</label>
          <textarea placeholder="Enter Description here..." />
        </div>
        <select>
          <option value="Filter" disabled style={{ display: "none" }}>
            Filter
          </option>
          <option value="all">All</option>
          <option value="toDo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="modal-footer">
        <button>{page == "edit" ? "Update" : "Add"}</button>
        <button onClick={() => closeModal(setShowModal)}>Cancel</button>
      </div>
    </PopupModal>
  );
};

export default EditModal;
