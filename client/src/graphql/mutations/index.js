import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($fp: String!) {
    createUser(fp: $fp) {
      __typename
      ... on User {
        fp
        projects {
          _id
        }
      }
      ... on UserExists {
        fp
        message
      }
    }
  }
`;
