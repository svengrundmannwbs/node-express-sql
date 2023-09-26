import express from "express";
import usersRouter from "./routes/usersRouter.js";
const app = express();
const PORT = 8000;

app.use(express.json()); // body-parser

//ROUTES
app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
