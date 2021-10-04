import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LISTS, GET_TASKS } from "../../graphql/queries";
import { CREATE_LIST } from "../../graphql/mutations";
import List from "./List";
import TimerContext from "../../contexts/TimerContext/index.js";
import Timer from "./Timer";
import ListForm from "./ListForm";
import ErrorModal from "../general/ErrorModal";
import { PrimaryButton } from "../general/Buttons.styles";
import Loading from "../general/Loading";
import {
  MainContainer,
  MainHeaderContainer,
  MainHeaderTitle,
} from "../general/Main.styles";
import { ListsContainer } from "./Board.styles";
import TaskForm from "./TaskForm";

const Board = () => {
  // Extract project id associated with the board
  const { projectId } = useParams();

  // Tracks when the user clicks on the button to create a new custom list
  const [openCreateListForm, setOpenCreateListForm] = useState(false);

  // Tracks when the user clicks on the button to create a new custom task
  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);

  // State to track when timer is turned on or off
  const [timer] = useContext(TimerContext);

  // ************************************************************
  // ***************** LISTS FUNCTIONS **************************
  // ************************************************************

  // Get lists using project id
  const getLists = useQuery(GET_LISTS, {
    variables: { projectId },
  });

  // Create new list in the db
  const [createListMutation, createList] = useMutation(CREATE_LIST, {
    refetchQueries: [
      {
        query: GET_LISTS,
        variables: { projectId },
      },
    ],
    awaitRefetchQueries: true,
  });

  const createListFunction = (listName) => {
    const data = { listInput: { name: listName, projectId: projectId } };
    createListMutation({ variables: data });
  };

  // ************************************************************
  // ***************** TASKS FUNCTIONS **************************
  // ************************************************************

  // Get tasks using project id
  const getTasks = useQuery(GET_TASKS, {
    variables: { projectId },
  });

  // Re-arrange tasks to be organized by list id
  const extractTasks = (getTasks) => {
    const tasksByList = {};

    if (
      getTasks &&
      getTasks.data &&
      getTasks.data.tasks.__typename === "Tasks"
    ) {
      const { tasks } = getTasks.data.tasks;

      tasks.forEach((task) => {
        const listId = task.listId;

        if (listId in tasksByList) {
          tasksByList[listId].push(task);
        } else {
          tasksByList[listId] = [task];
        }
      });
    }
    return tasksByList;
  };

  // ************************************************************
  // ******************** GENERAL FUNCTIONS *********************
  // ************************************************************

  // ************************************************************
  // ****************** RENDER FUNCTIONS ************************
  // ************************************************************

  // Loading and error states
  if (
    getLists.error ||
    createList.error ||
    getTasks.error
    // || createTask.error
  )
    return <ErrorModal />;
  if (
    getLists.loading ||
    createList.loading ||
    getTasks.loading
    // || createTask.loading
  )
    return <Loading />;

  // Toggle form to create a new list
  if (openCreateListForm)
    return (
      <ListForm
        openCreateListForm={openCreateListForm}
        setOpenCreateListForm={setOpenCreateListForm}
        createList={createListFunction}
      />
    );

  // Toggle form to create a new task
  if (openCreateTaskForm)
    return (
      <TaskForm
        openCreateTaskForm={openCreateTaskForm}
        setOpenCreateTaskForm={setOpenCreateTaskForm}
      />
    );

  // Tasks organized by list id
  const tasksByList = extractTasks(getTasks);

  return (
    <div>
      <MainHeaderContainer>
        <MainHeaderTitle>Your board</MainHeaderTitle>
        <PrimaryButton onClick={() => setOpenCreateListForm(true)}>
          New list
        </PrimaryButton>
      </MainHeaderContainer>
      <MainContainer>
        <ListsContainer>
          {getLists.data.lists.__typename === "Lists" &&
            getLists.data.lists.lists.map((list) => (
              <List
                key={list._id}
                list={list}
                setOpenCreateTaskForm={setOpenCreateTaskForm}
                tasks={list._id in tasksByList ? tasksByList[list._id] : []}
              />
            ))}
        </ListsContainer>
      </MainContainer>
      {timer.on && <Timer />}
    </div>
  );
};

export default Board;
