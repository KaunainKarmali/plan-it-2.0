import mongoose from "mongoose";
import timeSchema from "./timeSchema.js";

// task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  dueDate: { type: String, required: true },
  listId: { type: String, required: true },
  list: { type: String, required: true },
  creationDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  duration: { type: Number },
  tracking: [{ type: mongoose.Schema.Types.ObjectId, ref: "Time" }],
});

export default taskSchema;
