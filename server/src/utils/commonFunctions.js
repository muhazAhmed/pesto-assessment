import userModel from "../models/userModel.js";
import { RESPONSE_MESSAGE } from "./validation.js";

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
