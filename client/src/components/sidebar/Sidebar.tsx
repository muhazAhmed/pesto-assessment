import { FC, useEffect, useState } from "react";
import "./style.scss";
import { pathToIndex, sidebarItems } from "./ArrayOfItems";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSettings } from "../../utils/SettingsContext";
import { ResponseMessage } from "../../utils/Validations";
import EditModal from "../../pages/Dashboard/SubComponents/EditModal";
import {
  fetchUserId,
  newLocalStorage,
  openModal,
  useLocalStorage,
  useSessionStorage,
} from "../../utils/commonFunctions";
import Login from "../../pages/Login/Login";
import Loading from "../Loading/Loading";
import { fetchAllTasks } from "../../utils/onPageLoad";
import WarningPopup from "../../pages/Dashboard/SubComponents/WarningPopup";

interface SidebarProps {
  children: any;
}
const Sidebar: FC<SidebarProps> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(0);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formModal, setFormModal] = useState<boolean>(false);
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const { settings } = useSettings();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const currentPath = location.pathname;
    setSelectedItem(pathToIndex[currentPath] ?? null);
  }, [location.pathname]);

  useEffect(() => {
    const warning = useLocalStorage("1rfg3");
    const warningRead = useLocalStorage("dfd433"); //flag, so that warning popup will show only once
    const serverLoading = useSessionStorage("afg44");
    setTimeout(() => {
      if (warning === false && !fetchUserId) {
        if (!warningRead) {
          newLocalStorage("1rfg3", true);
          setWarningModal(true);
        } else return;
      } else {
        newLocalStorage("1rfg3", false);
      }
    }, serverLoading ? 20000 : 8000);
  }, []);

  const handleClick = (index: number, path: string) => {
    setSelectedItem(index);
    navigate(path);
  };

  const handleButton = () => {
    if (settings.enableCreatingNewTasks) {
      if (fetchUserId) {
        return openModal(setAddModal);
      } else {
        toast.error("Please Login");
        return openModal(setFormModal);
      }
    } else {
      return toast.error(
        ResponseMessage("Creating new tasks")?.SETTINGS_DISABLED,
        {
          duration: 4000,
        }
      );
    }
  };

  return (
    <div className="app-container">
      {loading && <Loading />}
      {warningModal && (
        <WarningPopup setModal={setWarningModal} setFormModal={setFormModal} />
      )}
      {addModal && (
        <EditModal
          setShowModal={setAddModal}
          page="add"
          setLoading={setLoading}
          fetchData={() => fetchAllTasks(setLoading)}
        />
      )}
      {formModal && <Login setModal={setFormModal} setLoading={setLoading} />}
      <div className="sidebar">
        <div className={` ${isSidebarOpen ? "sidebar-container" : "closed"}`}>
          <i
            className={`fa-solid ${isSidebarOpen ? "fa-xmark" : "fa-bars"}`}
            onClick={toggleSidebar}
          ></i>
          {isSidebarOpen && (
            <>
              <h1 onClick={() => navigate("/")}>Logo</h1>
              {sidebarItems?.map((item: any, index: number) => (
                <div
                  className={
                    selectedItem === index
                      ? "icon-shell selected"
                      : "icon-shell"
                  }
                  key={index}
                  onClick={() => handleClick(index, item?.path)}
                >
                  <i className={item?.icon}></i>
                  <h4>{item?.label}</h4>
                </div>
              ))}
              <div
                className="icon-shell new-task-button"
                onClick={handleButton}
              >
                <i className="fa-solid fa-plus"></i>
                <h4>New Task</h4>
              </div>
            </>
          )}
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
