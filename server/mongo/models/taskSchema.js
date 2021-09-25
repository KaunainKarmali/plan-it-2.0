import mongoose from "mongoose";
import timeSchema from "./timeSchema.js";

// task schema
const taskSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  listId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  priority: { type: String, required: true },
  dueDate: { type: Date, required: true },
  created: {
    type: Date,
    default: new Date(),
    required: true,
  },
  duration: { type: Number },
  tracking: [{ type: mongoose.Schema.Types.ObjectId, ref: "Time" }],
});

export default taskSchema;
