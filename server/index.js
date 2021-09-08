import dotenv from "dotenv";
dotenv.config();

// module imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import projectRoutes from "./routes/project.js";
import listRoutes from "./routes/list.js";
import taskRoutes from "./routes/task.js";

// setup app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// setup app middleware
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/list", listRoutes);
app.use("/task", taskRoutes);

// connect to local database
const CONNECTION_URL = "mongodb://localhost:27017/userDB";
// connect to mongoDB Atlas
// const CONNECTION_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.xwdfx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.get("/", (req, res) => res.send("Greetings from the back-end!"));
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  })
  .catch((error) => console.log(error));
