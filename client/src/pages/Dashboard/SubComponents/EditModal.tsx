import { FC } from "react";
import PopupModal from "../../../components/PopupModal/PopupModal";
import "./style.scss"

interface EditModalProps {
  setShowModal: any;
}

const EditModal: FC<EditModalProps> = ({ setShowModal }) => {
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
        <button>Update</button>
        <button>Cancel</button>
      </div>
    </PopupModal>
  );
};

export default EditModal;
