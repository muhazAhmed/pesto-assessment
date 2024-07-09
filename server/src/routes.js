import express from "express";
import { fetchOneUser, newUser } from "./controllers/userController.js";
import { createTask, deleteTask, fetchAllTask, fetchOneTask, updateTask } from "./controllers/taskController.js";
const routes = express.Router();

routes.get("/load", (req, res) => {
  return res.status(200).json("API is Active...");
});

// ============ User API's ==============
routes.post("/user/new", newUser)
routes.get("/user/fetch/:id", fetchOneUser)

// ============ Task API's ==============
routes.post("/tasks/new/:id", createTask)
routes.get("/tasks/fetch/:id", fetchOneTask)
routes.get("/tasks/fetch-all/:id", fetchAllTask)
routes.put("/tasks/update/:id", updateTask)
routes.delete("/tasks/delete/:id", deleteTask)

export default routes;
