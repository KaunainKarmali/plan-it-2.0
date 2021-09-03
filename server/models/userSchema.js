import mongoose from "mongoose";
import projectSchema from "./projectSchema.js";

// user schema
const userSchema = new mongoose.Schema({
  fp: String,
  userCreationDate: {
    type: Date,
    default: new Date(),
  },
  projects: [projectSchema],
});

export default userSchema;
