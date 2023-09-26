import { body } from "express-validator";

export const userValidator = [
  body("first_name").notEmpty().withMessage("first_name is required"),
  body("last_name").notEmpty().withMessage("last_name is required"),
  body("age")
    .notEmpty()
    .isInt()
    .withMessage("age is required and must be an integer"),
];
