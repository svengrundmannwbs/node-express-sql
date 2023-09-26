import { body } from "express-validator";

export const orderValidator = [
  body("price")
    .notEmpty()
    .isInt()
    .withMessage("price is required and needs to be an integer"),
  body("date")
    .isISO8601()
    .toDate()
    .notEmpty()
    .notEmpty()
    .withMessage("date is required / maybe wrong format?"),
  body("user_id")
    .notEmpty()
    .isInt()
    .withMessage("user_id is required and must be an integer"),
];
