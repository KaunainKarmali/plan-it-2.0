import mongoose from "mongoose";
import timeSchema from "./timeSchema.js";

// task schema
const taskSchema = new mongoose.Schema({
  taskName: String,
  taskDescription: String,
  taskPriority: String,
  taskDueDate: String,
  taskList: String,
  taskDuration: Number,
  taskTracking: [timeSchema],
});

export default taskSchema;
