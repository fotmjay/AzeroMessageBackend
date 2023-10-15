// CONSTANTS
const PORT = process.env.PORT || 3000;

//ROUTES
const apiRoutes = require("./routes/api");

// MODULES
import * as dotenv from "dotenv";
import cors = require("cors");
import express = require("express");
import morgan = require("morgan");
import { rateLimit } from "express-rate-limit";
import { rateLimiterConfig } from "./config/ratelimiter";

// INITIALIZATIONS
const app = express();
//@ts-ignore
const limiter = rateLimit(rateLimiterConfig);

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
app.use(limiter);

// ROUTES
app.use("/api", apiRoutes);

// SERVER LAUNCH

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
