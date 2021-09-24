// module imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { mongoUrl, graphiql } from "./settings.js";

// graphql imports
import { graphqlHTTP } from "express-graphql";
import rootValue from "./graphql/resolver/index.js";
import schema from "./graphql/schema/index.js";

// routes imports
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

// graphQl route
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: graphiql,
  })
);

// REST api middleware
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/list", listRoutes);
app.use("/task", taskRoutes);

// connect to mongoose
const CONNECTION_URL = mongoUrl;

console.log(CONNECTION_URL);

try {
  await mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.get("/", (req, res) => res.send("Greetings from the back-end!"));
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
} catch (error) {
  console.log(error);
  throw error;
}
