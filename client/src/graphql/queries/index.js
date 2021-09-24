import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($fp: String!) {
    user(fp: $fp) {
      __typename
      ... on User {
        fp
        projects {
          _id
        }
      }
      ... on UserNotFound {
        fp
      }
    }
  }
`;
