import mongoose from "mongoose";

// list schema
const listSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  name: { type: String, required: true },
  created: {
    type: Date,
    default: new Date(),
    required: true,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

export default listSchema;
