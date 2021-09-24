import mongoose from "mongoose";

// user schema
const userSchema = new mongoose.Schema({
  fp: { type: String, required: true },
  created: {
    type: Date,
    default: new Date(),
    required: true,
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

export default userSchema;
