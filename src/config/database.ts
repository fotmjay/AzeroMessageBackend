import { connect } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const connectDB = async () => {
  try {
    const conn = await connect(process.env.DB_STRING);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
