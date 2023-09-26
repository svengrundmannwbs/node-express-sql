import pool from "../db/server.js";

export const getOrders = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "something broke" });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1;", [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "something broke" });
  }
};

export const addOrder = async (req, res) => {
  const { price, date, user_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *;",
      [price, date, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "something broke" });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE orders SET price = $1, date = $2, user_id = $3 WHERE id = $4 RETURNING *;",
      [price, date, user_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "something broke" });
    console.log(err);
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM orders WHERE ID = $1;", [id]);
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "something broke" });
    console.log(err);
  }
};
