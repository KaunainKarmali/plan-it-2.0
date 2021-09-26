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
          dueDate
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

export const GET_LISTS = gql`
  query GetLists($projectId: String!) {
    lists(projectId: $projectId) {
      __typename
      ... on Lists {
        lists {
          name
          _id
        }
      }
      ... on ListsNotFound {
        message
      }
    }
  }
`;

export const GET_TASKS = gql`
  query GetTasks($projectId: String!) {
    tasks(projectId: $projectId) {
      __typename
      ... on Tasks {
        tasks {
          _id
          name
          dueDate
          description
          listId
          priority
          duration
          tracking {
            _id
          }
        }
      }
      ... on TasksNotFound {
        message
        projectId
      }
    }
  }
`;
