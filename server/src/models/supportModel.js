import mongoose from "mongoose";
import moment from "moment";

const SupportSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "-",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment().format("DD-MM-YYYY"),
  },
});

export default mongoose.model("Support", SupportSchema);
