import taskModel from "../models/taskModel.js";
import { findTask, findUser } from "../utils/commonFunctions.js";
import { REQUIRE_FIELD, RESPONSE_MESSAGE } from "../utils/validation.js";

export const createTask = async (req, res) => {
    try {
        const data = req.body;
        const { userId, title, description, status } = data;
        
        if (!req.params.id) return res.status(400).json({ message: REQUIRE_FIELD("User ID") });
        if (!title) return res.status(400).json({ message: REQUIRE_FIELD("Title") });
        if (!description) return res.status(400).json({ message: REQUIRE_FIELD("Description") });
        if (status.length < 1) data.status = "To Do";

        const userExists = await findUser(req.params.id, res);
        if (userExists) {
            data.userId = req.params.id;
            await taskModel.create(data);
            return res.status(201).json({ message: RESPONSE_MESSAGE("").NEW_TASK });
        } else {
            return res.status(400).json({ message: REQUIRE_FIELD("").NO_USER_FOUND });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: RESPONSE_MESSAGE("").SERVER_ERROR });
    }
};

export const fetchOneTask = async (req, res) => {
    try {
        const fetchOneData = await taskModel.findById({ _id: req.params.id });
        if (!fetchOneData) return res.status(404).json({ message: "No data found" });
        return res.status(200).json(fetchOneData);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: RESPONSE_MESSAGE("").SERVER_ERROR });
    }
};

export const fetchAllTask = async (req, res) => {
    try {
        const fetchAllData = await taskModel.find({ userId: req.params.id });
        if (!fetchAllData) return res.status(404).json({ message: "No data found" });
        return res.status(200).json(fetchAllData);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: RESPONSE_MESSAGE("").SERVER_ERROR });
    }
};

export const updateTask = async (req, res) => {
    try {
        const data = req.body;
        const { title, description, status } = data;

        const taskExists = await findTask(req.params.id, res);
        if (taskExists) {
            await taskModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: data },
                { new: true }
            );
            return res.status(200).json({ message: RESPONSE_MESSAGE("").USER_UPDATE });
        } else {
            return res.status(400).json({ message: REQUIRE_FIELD("").NO_TASK_FOUND });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: RESPONSE_MESSAGE("").SERVER_ERROR });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const taskExists = await findTask(req.params.id, res);
        if (taskExists) {
            await taskModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: RESPONSE_MESSAGE("").TASK_DELETE });
        } else {
            return res.status(400).json({ message: REQUIRE_FIELD("").NO_TASK_FOUND });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: RESPONSE_MESSAGE("").SERVER_ERROR });
    }
};
