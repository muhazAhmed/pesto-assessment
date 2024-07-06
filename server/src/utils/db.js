import mongoose from "mongoose";

export const DB = (URL = process.env.MONGO_URI) =>
  mongoose
    .connect(URL)
    .then(() => console.log("Database Connection Established"))
    .catch((error) => console.log(error));