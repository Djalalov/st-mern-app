const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

/* const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database has been connected successfully!! ");
}); */

/* const exercisesRouter = require("./routes/exercises");
const studentsRouter = require("./routes/students"); */

/* app.use("/exercises", exercisesRouter);
app.use("/students", studentsRouter); */

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
