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

export const CREATE_PROJECT = gql`
  mutation CreateProject($projectInput: ProjectInput!) {
    createProject(projectInput: $projectInput) {
      __typename
      ... on Project {
        _id
        name
      }
      ... on UserNotFound {
        message
      }
    }
  }
`;

export const CREATE_LIST = gql`
  mutation CreateList($listInput: ListInput!) {
    createList(listInput: $listInput) {
      __typename
      ... on List {
        _id
        name
      }
      ... on ProjectNotFound {
        message
      }
    }
  }
`;
