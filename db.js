import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/");

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB Connected");
});
