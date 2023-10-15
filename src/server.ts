// CONSTANTS
const PORT = process.env.PORT || 3000;

//ROUTES
const apiRoutes = require("./routes/api");

// MODULES
import * as dotenv from "dotenv";
import cors = require("cors");
import express = require("express");
import morgan = require("morgan");

// INITIALIZATIONS
const app = express();

// CONFIGS
dotenv.config({ path: __dirname + "/.env" });
const connectDB = require("./config/database");

// CONNECT TO DATABASE
connectDB();

// BODY PARSERS
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//MIDDLEWARE
app.use(morgan("dev"));

// ROUTES
app.use("/api", apiRoutes);

// SERVER LAUNCH

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
