const mongoose = require("mongoose");
import moment from "moment";

const TaskSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Task", TaskSchema);
