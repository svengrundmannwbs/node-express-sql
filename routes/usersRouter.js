import express from "express";
import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getOrdersByUserId,
  setUserInactive,
} from "../controllers/users.js";
import { userValidator } from "../middleware/userValidator.js";

//USERS
const usersRouter = express.Router();
usersRouter.route("/").get(getUsers).post(userValidator, addUser);
usersRouter
  .route("/:id")
  .get(getUserById)
  .put(userValidator, updateUser)
  .delete(deleteUser);
//BONUS
usersRouter.route("/:id/orders").get(getOrdersByUserId);
usersRouter.route("/:id/set-inactive").put(setUserInactive);

export default usersRouter;
