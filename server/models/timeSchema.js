import mongoose from "mongoose";

// time schema
const timeSchema = new mongoose.Schema({
  duration: { type: Number },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default timeSchema;
