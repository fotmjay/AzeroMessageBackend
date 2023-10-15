"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// CONSTANTS
const PORT = process.env.PORT || 3000;
//ROUTES
const apiRoutes = require("./routes/api");
// MODULES
const dotenv = __importStar(require("dotenv"));
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
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
