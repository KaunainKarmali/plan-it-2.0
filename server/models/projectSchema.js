import mongoose from "mongoose";
import listSchema from "./listSchema.js";

// project schema
const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
  },
  projectCreationDate: {
    type: Date,
    default: new Date(),
  },
  startDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
  lists: [listSchema],
});

export default projectSchema;
