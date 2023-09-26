import pool from "../db/server.js";
import { validationResult } from "express-validator";

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "something broke" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1;", [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "something broke" });
  }
};

export const addUser = async (req, res) => {
  const { first_name, last_name, age } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *;",
      [first_name, last_name, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "something broke" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }

  const { first_name, last_name, age } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *;",
      [first_name, last_name, age, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "something broke" });
    console.log(err);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE ID = $1;", [id]);
    res.status(200).json({ message: "user deleted" });
  } catch (err) {
    res.status(500).json({ message: "something broke" });
    console.log(err);
  }
};

//Bonus 1: get Orders for user by id
export const getOrdersByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1;",
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "something broke" });
  }
};

//Bonus 2: set user inactive by id if no orders are found
export const setUserInactive = async (req, res) => {
  const { id } = req.params;
  try {
    const resultA = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1;",
      [id]
    );
    if (resultA.rowCount === 0) {
      const result = await pool.query(
        "UPDATE users SET active = false WHERE id = $1;",
        [id]
      );
      res.status(200).json({ message: "user set to inactive" });
    } else res.status(200).json({ message: "user got orders" });
  } catch (error) {
    res.status(500).json({ message: "something broke" });
  }
};
