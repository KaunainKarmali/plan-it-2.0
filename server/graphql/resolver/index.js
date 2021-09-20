import { createUser, getUser } from "./user.js";

const rootValue = {
  user: (args) => getUser(args.fp),
  createUser: (args) => createUser(args.fp),
};

export default rootValue;
