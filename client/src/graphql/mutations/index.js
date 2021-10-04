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

export const CREATE_TASK = gql`
  mutation CreateTask($taskInput: TaskInput!) {
    createTask(taskInput: $taskInput) {
      __typename
      ... on Task {
        name
        dueDate
        description
        listId
        priority
      }
      ... on ListNotFound {
        message
        listId
      }
    }
  }
`;

export const EDIT_TASK = gql`
  mutation EditTask($editTaskInput: EditTaskInput!) {
    editTask(editTaskInput: $editTaskInput) {
      __typename
      ... on Task {
        _id
        projectId
        listId
        name
        description
        priority
        dueDate
        created
        duration
        tracking {
          _id
        }
      }
      ... on TaskNotEditted {
        _id
        message
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($_id: String!) {
    deleteTask(_id: $_id) {
      __typename
      ... on TaskDeleted {
        _id
        message
      }
      ... on TaskNotDeleted {
        _id
        message
      }
    }
  }
`;
