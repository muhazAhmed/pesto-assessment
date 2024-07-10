import { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./style.scss";
import { openModal, useLocalStorage } from "../../utils/commonFunctions";
import EditModal from "./SubComponents/EditModal";
import Loading from "../../components/Loading/Loading";
import DeleteModal from "./SubComponents/DeleteModal";

const Dashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const colors = ["glassPurple", "glassBlue", "glassPink"];
  const containerRef = useRef<HTMLDivElement>(null);
  const defaultSettings = useLocalStorage("defaultSettings");

  const items = [
    {
      date: "12-04-2024",
      title: "demo title",
      desc: "ns properties like Padding, Spacing, Spacing Mode",
      status: "Done",
    },
    {
      date: "10-04-2024",
      title: "demo title 2",
      desc: "ns properties like Padding, Spacing, Spacing Mode",
      status: "In Progress",
    },
    {
      date: "10-04-2024",
      title: "demo title 2",
      desc: "ns properties like Padding, Spacing, Spacing Mode",
      status: "In Progress",
    },
    {
      date: "10-04-2024",
      title: "demo title 2",
      desc: "ns properties like Padding, Spacing, Spacing Mode",
      status: "In Progress",
    },
  ];

  let previousColor: string | null = null;
  const getRandomColor = (previousColor: string | null): string => {
    let color = colors[Math.floor(Math.random() * colors.length)];
    while (color === previousColor) {
      color = colors[Math.floor(Math.random() * colors.length)];
    }
    return color;
  };

  const filteredItems = items.filter((item) => {
    if (selectedFilter === "" || selectedFilter === "all") return true;
    if (selectedFilter === "toDo" && item.status === "To Do") return true;
    if (selectedFilter === "inProgress" && item.status === "In Progress")
      return true;
    if (selectedFilter === "done" && item.status === "Done") return true;
    return false;
  });

  return (
    <div className="dashboard">
      {loading && <Loading />}
      {editModal && <EditModal setShowModal={setEditModal} page="edit" />}
      {deleteModal && <DeleteModal setModal={setDeleteModal} page="delete" />}
      <div className="header">
        <h1>Tasks</h1>
        <div className="search-bar">
          <input placeholder="Search Title..." />
          <i className="fa-solid fa-search"></i>
        </div>
        <select
          value={selectedFilter === "" ? "Filter" : selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="Filter" disabled style={{ display: "none" }}>
            Filter
          </option>
          <option value="all">All</option>
          <option value="toDo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <motion.div
        className="dashboard-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        ref={containerRef}
      >
        {filteredItems?.map((item: any, index: number) => {
          const color = getRandomColor(previousColor);
          previousColor = color;
          return (
            <motion.div
              className="card"
              key={index}
              style={{ backgroundColor: `var(--${color})` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={
                defaultSettings?.isAnimationEnabled && { scale: 1.05 }
              }
              layout={defaultSettings?.isAnimationEnabled}
              drag={defaultSettings?.isAnimationEnabled}
              dragConstraints={containerRef}
              dragElastic={0.5}
            >
              <div className="header">
                <h5>{item?.date}</h5>
                <h5
                  style={
                    item?.status === "To Do"
                      ? { backgroundColor: "var(--glassRed)" }
                      : item?.status === "In Progress"
                      ? { backgroundColor: "var(--glassYellow)" }
                      : { backgroundColor: "var(--glassGreen)" }
                  }
                >
                  {item?.status}
                </h5>
              </div>
              <h3>{item?.title}</h3>
              <p>{item?.desc}</p>
              <div className="buttons">
                <i
                  className="fa-solid fa-pencil"
                  data-title="Edit"
                  onClick={() => openModal(setEditModal)}
                ></i>
                <i
                  className="fa-solid fa-trash"
                  data-title="Delete"
                  onClick={() => openModal(setDeleteModal)}
                ></i>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Dashboard;
