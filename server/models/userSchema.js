import mongoose from "mongoose";

// user schema
const userSchema = new mongoose.Schema({
  fp: { type: String, required: true },
  userCreationDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

export default userSchema;
