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

export const GET_PROJECTS = gql`
  query GetProjects($fp: String!) {
    projects(fp: $fp) {
      __typename
      ... on Projects {
        projects {
          _id
          name
          lists {
            _id
          }
        }
      }
      ... on ProjectsNotFound {
        message
      }
    }
  }
`;
