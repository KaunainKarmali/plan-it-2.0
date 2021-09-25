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
    fp: String!
    name: String!
    created: String!
    startDate: String!
    dueDate: String!
    lists: [List!]
  }

  type ProjectsNotFound {
    fp: String!
    message: String!
  }

  input ProjectInput {
    fp: String!
    name: String!
    startDate: String!
    dueDate: String!
  }

  type Projects {
    projects: [Project!]
  }

  union GetProjectsResult = Projects | ProjectsNotFound

  union CreateProjectResult = Project | UserNotFound

  type List {
    _id: ID!
    projectId: String!
    name: String!
    created: String!
  }

  type RootQuery {
    user(fp: String!): GetUserResult!
    projects(fp: String!): GetProjectsResult!
  }

  type RootMutation {
    createUser(fp: String!): CreateUserResult!
    createProject(projectInput: ProjectInput!): CreateProjectResult!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

export default schema;
