const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const mongoose = require("mongoose");

app.use(express.json());

app.use(cors());

app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Notes API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb+srv://chirag_cy:Chirag34@cluster0.dvtc65t.mongodb.net/notes_db?retryWrites=true&w=majority")
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is started on port no. " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
