import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./style.scss";
import {
  fetchUserId,
  openModal,
  useLocalStorage,
} from "../../utils/commonFunctions";
import EditModal from "./SubComponents/EditModal";
import Loading from "../../components/Loading/Loading";
import DeleteModal from "./SubComponents/DeleteModal";
import { fetchAllTasks, fetchDummyData } from "../../utils/onPageLoad";
import Login from "../Login/Login";
import ViewModal from "./SubComponents/ViewModal";

const Dashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formModal, setFormModal] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const colors = ["glassPurple", "glassBlue", "glassPink"];
  const containerRef = useRef<HTMLDivElement>(null);
  const defaultSettings = useLocalStorage("defaultSettings");

  useEffect(() => {
    if (fetchUserId) {
      fetchAllTasks(setLoading, setData);
    } else {
      setData(fetchDummyData());
    }
  }, []);

  let previousColor: string | null = null;
  const getRandomColor = (previousColor: string | null): string => {
    let color = colors[Math.floor(Math.random() * colors.length)];
    while (color === previousColor) {
      color = colors[Math.floor(Math.random() * colors.length)];
    }
    return color;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const filteredItems = data
    .filter((item: any) => {
      if (selectedFilter === "" || selectedFilter === "all") return true;
      if (selectedFilter === "toDo" && item.status === "To Do") return true;
      if (selectedFilter === "inProgress" && item.status === "In Progress")
        return true;
      if (selectedFilter === "done" && item.status === "Done") return true;
      return false;
    })
    .filter((item: any) => {
      return item.title.toLowerCase().includes(searchTitle.toLowerCase());
    });

  return (
    <div className="dashboard">
      {loading && <Loading />}
      {formModal && <Login setLoading={setLoading} setModal={setFormModal} />}
      {viewModal && (
        <ViewModal setModal={setViewModal} taskInfo={selectedTaskId} />
      )}

      {editModal && (
        <EditModal
          setShowModal={setEditModal}
          page="edit"
          setLoading={setLoading}
          taskData={selectedTaskId}
          fetchData={() => fetchAllTasks(setLoading, setData)}
        />
      )}
      {deleteModal && (
        <DeleteModal
          setModal={setDeleteModal}
          setLoading={setLoading}
          fetchData={() => fetchAllTasks(setLoading, setData)}
          taskID={selectedTaskId}
          page="delete"
        />
      )}
      <div className="header">
        <h1>Tasks</h1>
        <div className="search-bar">
          <input
            placeholder="Search Title..."
            value={searchTitle}
            onChange={handleSearchChange}
          />
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
      {filteredItems.length === 0 && (
        <motion.div
          className="empty-state"
          initial={
            defaultSettings?.isAnimationEnabled && { opacity: 0, y: -20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>No tasks found, Click on (+ New Task)</h1>
        </motion.div>
      )}
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
              onClick={() => {
                setSelectedTaskId(item), openModal(setViewModal);
              }}
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
              <p>{truncateText(item?.description, 100)}</p>
              <div className="buttons">
                <i
                  className="fa-solid fa-pencil"
                  data-title="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTaskId(item), openModal(setEditModal);
                  }}
                ></i>
                <i
                  className="fa-solid fa-trash"
                  data-title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTaskId(item?._id), openModal(setDeleteModal);
                  }}
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
