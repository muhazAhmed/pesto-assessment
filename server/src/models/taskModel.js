import mongoose from "mongoose";
import moment from "moment";

const TaskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
    default: moment().format("DD-MM-YYYY"),
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
});

export default mongoose.model("Task", TaskSchema);
