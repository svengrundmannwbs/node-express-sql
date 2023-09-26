import { body } from "express-validator";

export const orderValidator = [
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isInt()
    .withMessage("price must be an integer"),
  body("date")
    .notEmpty()
    .withMessage("date is required")
    .isISO8601()
    .toDate()
    .withMessage("date must be in format ISO8601"),
  body("user_id")
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
];
