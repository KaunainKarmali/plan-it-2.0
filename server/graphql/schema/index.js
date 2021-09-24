import { buildSchema } from "graphql";

const schema = buildSchema(`
  type User {
    _id: ID!
    fp: String!
    created: String!
    projects: [Project!]
  }

  type UserNotFound {
    fp: String!
    message: String!
  }

  type UserExists {
    fp: String!
    message: String!
  }

  union GetUserResult = User | UserNotFound

  union CreateUserResult = User | UserExists

  type Project {
    _id: ID!
    name: String!
    created: String!
    dueDate: String!
  }

  type RootQuery {
    user(fp: String!): GetUserResult!
  }

  type RootMutation {
    createUser(fp: String!): CreateUserResult!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

export default schema;
