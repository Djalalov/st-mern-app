import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database has been connected successfully");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
