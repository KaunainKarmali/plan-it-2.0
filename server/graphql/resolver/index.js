import { getProjects, createProject } from "./project.js";
import { createUser, getUser } from "./user.js";

const rootValue = {
  user: (args) => getUser(args.fp),
  createUser: (args) => createUser(args.fp),
  projects: (args) => getProjects(args.fp),
  createProject: (args) => createProject(args.projectInput),
};

export default rootValue;
