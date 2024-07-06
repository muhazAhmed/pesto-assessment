import express from "express";
const routes = express.Router();

routes.get("/load", (req, res) => {
  return res.status(200).json("API is Active...");
});

export default routes;
