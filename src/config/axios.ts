import axios from "axios";
import { APIBASEURL } from "../constants/endpointForApi";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

export const axiosInstance = axios.create({
  baseURL: APIBASEURL.aleph,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": process.env.VITE_SUBSCAN_API_KEY,
  },
});
