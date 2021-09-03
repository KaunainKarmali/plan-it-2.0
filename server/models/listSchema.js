import mongoose from "mongoose";
import taskSchema from "./taskSchema.js";

// list schema
const listSchema = new mongoose.Schema({
  listName: [taskSchema],
});

export default listSchema;
