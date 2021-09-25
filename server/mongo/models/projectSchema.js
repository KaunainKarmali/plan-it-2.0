import mongoose from "mongoose";
import listSchema from "./listSchema.js";

// project schema
const projectSchema = new mongoose.Schema({
  fp: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: new Date(),
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
});

export default projectSchema;
