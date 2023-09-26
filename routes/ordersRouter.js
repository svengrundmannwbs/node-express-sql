import express from "express";
import {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.js";
import { orderValidator } from "../middleware/orderValidator.js";

//ORDERS
const ordersRouter = express.Router();
ordersRouter.route("/").get(getOrders).post(orderValidator, addOrder);
ordersRouter
  .route("/:id")
  .get(getOrderById)
  .put(orderValidator, updateOrder)
  .delete(deleteOrder);

export default ordersRouter;
