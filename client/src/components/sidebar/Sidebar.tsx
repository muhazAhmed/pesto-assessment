import { FC, useEffect, useState } from "react";
import "./style.scss";
import { pathToIndex, sidebarItems } from "./ArrayOfItems";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSettings } from "../../utils/SettingsContext";
import { ResponseMessage } from "../../utils/Validations";

interface SidebarProps {
  children: any;
}
const Sidebar: FC<SidebarProps> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(0);
  const navigate = useNavigate();
  const { settings } = useSettings();

  useEffect(() => {
    const currentPath = location.pathname;
    setSelectedItem(pathToIndex[currentPath] ?? null);
  }, [location.pathname]);

  const handleClick = (index: number, path: string) => {
    setSelectedItem(index);
    navigate(path);
  };

  const handleButton = () => {
    if (settings.enableCreatingNewTasks) {
      // Handle creating new tasks logic here
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
      <div className="sidebar">
        <div className="sidebar-container">
          <h1>Logo</h1>
          {sidebarItems?.map((item: any, index: number) => (
            <div
              className={
                selectedItem === index ? "icon-shell selected" : "icon-shell"
              }
              key={index}
              onClick={() => handleClick(index, item?.path)}
            >
              <i className={item?.icon}></i>
              <h4>{item?.label}</h4>
            </div>
          ))}
          <div className="icon-shell new-task-button" onClick={handleButton}>
            <i className="fa-solid fa-plus"></i>
            <h4>New Task</h4>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
