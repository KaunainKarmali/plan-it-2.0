import mongoose from "mongoose";

// list schema
const listSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  listName: { type: String, required: true },
  listCreationDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
});

export default listSchema;
