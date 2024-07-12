import { FC, useEffect, useState } from "react";
import PopupModal from "../../../components/PopupModal/PopupModal";
import "./style.scss";
import {
  closeModal,
  fetchUserId,
  newSessionStorage,
  useSessionStorage,
} from "../../../utils/commonFunctions";
import { PatchMethodAPI, PostMethodAPI } from "../../../utils/axios";
import { serverVariables } from "../../../utils/ServerVariables";
import { useNavigate } from "react-router-dom";
import { formValidation } from "../validation";

interface EditModalProps {
  setShowModal: any;
  setLoading: any;
  page: string;
  taskData?: any;
  fetchData: any;
}

const EditModal: FC<EditModalProps> = ({
  setShowModal,
  page,
  taskData,
  setLoading,
  fetchData,
}) => {
  const navigate = useNavigate();
  const [valid, setValid] = useState<boolean>(false);
  const [inputs, setInputs] = useState<any>({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (page === "edit" && taskData) {
      setInputs({
        title: taskData.title || "",
        description: taskData.description || "",
        status: taskData.status || "",
      });
    }
  }, [page, taskData]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputs((prev: any) => ({ ...prev, [name]: value }));
  };

  const resFunc = (res: any) => {
    if (res) {
      if (page == "add") {
        location.reload();
      } else {
        fetchData();
      }
      closeModal(setShowModal);
      return navigate("/");
    } else {
      return setLoading(false);
    }
  };

  const handleButton = async () => {
    const isValid = formValidation(inputs);
    setValid(isValid);
    console.log(valid)
    if (isValid) {
      if (useSessionStorage("isDemoAccount")) {
        if (page == "edit") {
          const sessionData = useSessionStorage("dummy-data") || [];
          const newSessionData = sessionData.map((task: any) =>
            task._id === taskData?._id ? { ...task, ...inputs } : task
          );

          newSessionStorage("dummy-data", newSessionData);
          closeModal(setShowModal);
        } else {
          return;
        }
      } else if (fetchUserId && page === "edit") {
        const res = await PatchMethodAPI(
          serverVariables?.UPDATE_TASK + taskData?._id,
          inputs,
          setLoading
        );
        resFunc(res);
      } else if (fetchUserId && page === "add") {
        const res = await PostMethodAPI(
          serverVariables?.NEW_TASK + fetchUserId,
          inputs,
          setLoading
        );
        resFunc(res);
      } else {
        return;
      }
    }
  };
  return (
    <PopupModal setModal={setShowModal}>
      <div className="modal-body">
        <div className="item">
          <label>Title:</label>
          <input
            type="text"
            placeholder="Enter Title"
            name="title"
            value={inputs?.title || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="item">
          <label>Description:</label>
          <textarea
            placeholder="Enter Description here..."
            name="description"
            value={inputs?.description || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="item">
          <label>Status:</label>
          <select
            name="status"
            value={inputs.status || ""}
            onChange={handleInputChange}
          >
            <option value="Filter" disabled style={{ display: "none" }}>
              Filter
            </option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={handleButton}>
          {page == "edit" ? "Update" : "Add"}
        </button>
        <button onClick={() => closeModal(setShowModal)}>Cancel</button>
      </div>
    </PopupModal>
  );
};

export default EditModal;
