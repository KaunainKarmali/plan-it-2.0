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

  type Projects {
    projects: [Project!]
  }

   type ProjectNotFound {
    projectId: String!
    message: String!
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

  union GetProjectsResult = Projects | ProjectsNotFound

  union CreateProjectResult = Project | UserNotFound

  type List {
    _id: ID!
    projectId: String!
    name: String!
    created: String!
    tasks: [Task!]
  }

  type Lists {
    lists: [List!]
  }

  type ListsNotFound {
    projectId: String!
    message: String!
  }

  input ListInput {
    projectId: String!
    name: String!
  }

  union GetListsResult = Lists | ListsNotFound

  union CreateListResult = List | ProjectNotFound

  type Task {
    _id: ID!
    projectId: String!
    listId: String!
    name: String!
    description: String
    priority: String!
    dueDate: String!
    created: String!
    duration: Int!
    tracking: [Time]
  }

  type Time {
    start: String!
    end: String!
    duration: Int!
  }

  type RootQuery {
    user(fp: String!): GetUserResult!
    projects(fp: String!): GetProjectsResult!
    lists(projectId: String!): GetListsResult!
  }

  type RootMutation {
    createUser(fp: String!): CreateUserResult!
    createProject(projectInput: ProjectInput!): CreateProjectResult!
    createList(listInput: ListInput!): CreateListResult!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

export default schema;
