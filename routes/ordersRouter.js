import express from "express";
import {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.js";

//USERS
const ordersRouter = express.Router();
ordersRouter.route("/").get(getOrders).post(addOrder);
ordersRouter
  .route("/:id")
  .get(getOrderById)
  .put(updateOrder)
  .delete(deleteOrder);

export default ordersRouter;
