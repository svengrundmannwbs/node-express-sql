import express from "express";
import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

//USERS
const usersRouter = express.Router();
usersRouter.route("/").get(getUsers).post(addUser);
usersRouter.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default usersRouter;
