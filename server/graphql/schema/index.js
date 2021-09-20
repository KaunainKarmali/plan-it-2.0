import { buildSchema } from "graphql";

const schema = buildSchema(`
  type User {
      _id: ID!
      fp: String!
      created: String!
      projects: [Project!]
  }

  type Project {
    _id: ID!
    name: String!
    created: String!
    dueDate: String!
  }

  type RootQuery {
    user(fp: String!): User!
  }

  type RootMutation {
    createUser(fp: String!): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

export default schema;

// {
//   user(fp:"bd32f20bb33a6c01b75d60ac90e0a8d7") {
//     fp
//     _id
//     created
//   }
// }

// mutation{
//   createUser(fp:"bd32f20bb33a6c01b75d60ac90e0a8d7") {
//     fp
//     created
//   }
// }
