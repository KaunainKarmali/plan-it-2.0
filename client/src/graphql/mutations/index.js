import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  query CreateUser($fp: String!) {
    createUser(fp: $fp) {
      fp
      projects {
        _id
      }
    }
  }
`;
