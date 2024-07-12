import { FC } from "react";
import PopupModal from "../../../components/PopupModal/PopupModal";
import "./style.scss";
import { closeModal } from "../../../utils/commonFunctions";

interface PopupModalProps {
  setModal: any;
  taskInfo: any;
}

const ViewModal: FC<PopupModalProps> = ({ setModal, taskInfo }) => {
  return (
    <PopupModal setModal={setModal}>
      <div className="view-modal">
        <div className="header">
          <h5 data-title="Created On">{taskInfo?.date}</h5>
          <h5
            data-title="Status"
            style={
              taskInfo?.status === "To Do"
                ? { backgroundColor: "var(--glassRed)" }
                : taskInfo?.status === "In Progress"
                ? { backgroundColor: "var(--glassYellow)" }
                : { backgroundColor: "var(--glassGreen)" }
            }
          >
            {taskInfo?.status}
          </h5>
        </div>
        <h5>
          <span>Title:</span> {taskInfo?.title}
        </h5>
        <p>
          <span>Description:</span> {taskInfo?.description}
        </p>
        <div className="buttons">
          <button onClick={() => closeModal(setModal)}>Back</button>
        </div>
      </div>
    </PopupModal>
  );
};

export default ViewModal;
