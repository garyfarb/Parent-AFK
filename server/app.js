import express from "express";
const app = express();
import cors from "cors";
import pool from "./db/config.js";

const port = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());

// routes


app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
})

