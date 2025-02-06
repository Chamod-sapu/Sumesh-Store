const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 6001; 

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((error) => console.log(error));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!");
});

const itemRouter = require("./Routes/ItemRoutes.js");
const orderRouter = require("./Routes/OrderRoutes.js");

app.use("/Item", itemRouter);
app.use("/Order", orderRouter);

