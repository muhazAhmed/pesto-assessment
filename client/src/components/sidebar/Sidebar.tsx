import { FC, useState } from "react";
import "./style.scss";
import { sidebarItems } from "./ArrayOfItems";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  children: any;
}
const Sidebar: FC<SidebarProps> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(0);
  const navigate = useNavigate();

  const handleClick = (index: number) => {
    setSelectedItem(index);
    index === 0
      ? navigate("/")
      : index === 1
      ? navigate("/about")
      : navigate("/contact");
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
              onClick={() => handleClick(index)}
            >
              <i className={item?.icon}></i>
              <h4>{item?.label}</h4>
            </div>
          ))}
          <div className="icon-shell new-task-button">
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
