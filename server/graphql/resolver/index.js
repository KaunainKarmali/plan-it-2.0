import { createUser, getUser } from "./user.js";
import { getProjects, createProject } from "./project.js";
import { getLists, createList } from "./list.js";
import { getTasks, createTask } from "./task.js";

const rootValue = {
  user: (args) => getUser(args.fp),
  createUser: (args) => createUser(args.fp),
  projects: (args) => getProjects(args.fp),
  createProject: (args) => createProject(args.projectInput),
  lists: (args) => getLists(args.projectId),
  createList: (args) => createList(args.listInput),
  tasks: (args) => getTasks(args.projectId),
  createTask: (args) => createTask(args.taskInput),
};

export default rootValue;
