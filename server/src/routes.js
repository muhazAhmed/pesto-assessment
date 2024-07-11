import express from "express";
import { fetchOneUser, loginUser, newUser } from "./controllers/userController.js";
import { createTask, deleteTask, fetchAllTask, fetchOneTask, updateTask } from "./controllers/taskController.js";
import { newMessage } from "./controllers/supportController.js";
const routes = express.Router();

routes.get("/load", (req, res) => {
  return res.status(200).json("API is Active...");
});

// ============ User API's ==============
routes.post("/user/new", newUser)
routes.post("/user/login", loginUser)
routes.get("/user/fetch/:id", fetchOneUser)

// ============ Task API's ==============
routes.post("/tasks/new/:id", createTask)
routes.get("/tasks/fetch/:id", fetchOneTask)
routes.get("/tasks/fetch-all/:id", fetchAllTask)
routes.patch("/tasks/update/:id", updateTask)
routes.delete("/tasks/delete/:id", deleteTask)

// ============ Services API's ==============
routes.post("/support/new", newMessage)


export default routes;
