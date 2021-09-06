import mongoose from "mongoose";
import userSchema from "./userSchema.js";
import projectSchema from "./projectSchema.js";
import listSchema from "./listSchema.js";
import taskSchema from "./taskSchema.js";

const User = mongoose.model("User", userSchema);
export const Project = mongoose.model("Project", projectSchema);
export const List = mongoose.model("List", listSchema);
export const Task = mongoose.model("Task", taskSchema);

export default User;
