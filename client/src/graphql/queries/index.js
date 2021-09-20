import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($fp: String!) {
    user(fp: $fp) {
      fp
      projects {
        _id
      }
    }
  }
`;
