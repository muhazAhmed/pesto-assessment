import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { RESPONSE_MESSAGE } from "./validation.js";
import jwt from "jsonwebtoken";

export const findUser = async (userId, res) => {
  try {
    if (userId) {
      const userExists = await userModel.findOne({ _id: userId });
      if (userExists) {
        return userExists;
      } else {
        return false;
      }
    } else {
      return console.log("Error: Please provide User ID. (commonFunction.js: 14)");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const findTask = async (taskId, res) => {
  try {
    if (taskId) {
      const taskExists = await taskModel.findOne({ _id: taskId });
      if (taskExists) {
        return taskExists;
      } else {
        return false;
      }
    } else {
      return console.log("Error: Please provide Task ID. (commonFunction.js: 33)");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const GenJWT = (result) => {
  const token = jwt.sign(
    {
      userId: result._id.toString(),
    },
    process.env.JWT_SECRET
  );
  return token;
};