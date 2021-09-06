import { useState, useEffect } from "react";
import styled from "styled-components";
import { stdBR } from "../variables/borders";
import { black, grey2 } from "../variables/colours";
import { footerHeight, headerHeight } from "../variables/heights";
import { stdSpace } from "../variables/spacing";
import { tabletWidthLrg } from "../variables/widths";
import ListTitle from "./ListTitle";
import Task from "./Task";
import { serverUrl } from "../settings";
import TaskForm from "./TaskForm";
import ErrorModal from "./ErrorModal";

const List = (props) => {
  const { list, setToggleTaskCreated, toggleTaskCreated } = props;

  // Tracks if an error occurred during the fetch and displays message to the user
  const [error, setError] = useState({ error: false, message: "" });

  // Stores the user's tasks
  const [tasks, setTasks] = useState([]);

  // Tracks whether to create a new task or not
  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);

  // Fetch tasks from the database
  useEffect(() => {
    if (list._id && list._id !== undefined) {
      const url = new URL(`${serverUrl}/task/get-tasks`);
      const params = { listId: list._id };
      url.search = new URLSearchParams(params).toString();

      fetch(url)
        .then((res) => {
          // Check if response was successful
          if (res.ok) {
            // If projects were found, 200 status is returned
            if (res.status === 200) {
              return res.json();
            }

            // If request was successful, but project cannot be found, return false to indicate that no project was found
            else {
              throw new Error(res.status);
            }
          }

          // Throw error if errors are found
          else {
            throw new Error(res.status);
          }
        })
        .then((res) => {
          // Save lists found
          setTasks(res);
        })
        .catch((error) => {
          // If errors are found, generate an error message and update error state to display error to user
          const status = parseInt(error.message);
          let message = "";

          if (status === 500) {
            message = "Lists cannot be found. Please try again later.";
          } else if (status === 400) {
            message =
              "Project ID was not provided. Please contact the database administrator.";
          } else {
            message = "An error occurred while retrieving your lists.";
          }

          setError({ error: true, message: message });
        });
    }
  }, [list, toggleTaskCreated]);

  // Create tasks and save it in the database
  const createTask = (taskDetails) => {
    const url = `${serverUrl}/task/create-task`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: taskDetails, listId: taskDetails.listId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((res) => setToggleTaskCreated(!toggleTaskCreated))
      .catch((error) => {
        // If errors are found, generate an error message and update error state to display error to user
        const status = parseInt(error.message);
        let message = "";

        if (status === 400) {
          message =
            "Incomplete data provided in the request. Please contact the database administrator.";
        } else if (status === 500) {
          message = "List cannot be found. Please try again later.";
        } else if (status === 400) {
          message =
            "Task cannot be created. Please contact the database administrator.";
        } else {
          message = "An error occurred. Task cannot be created.";
        }

        setToggleTaskCreated(!toggleTaskCreated);
        setError({ error: true, message: message });
      });
  };

  return (
    <div>
      <ListWrapper>
        <ListTitle
          list={list.listName}
          setOpenCreateTaskForm={setOpenCreateTaskForm}
        />
        <TasksWrapper>
          <Tasks>
            {tasks && tasks.map((task) => <Task key={task._id} task={task} />)}
          </Tasks>
        </TasksWrapper>
      </ListWrapper>
      {openCreateTaskForm && (
        <TaskForm
          setOpenCreateTaskForm={setOpenCreateTaskForm}
          createTask={createTask}
        />
      )}
      {error.error && <ErrorModal error={error} setError={setError} />}
    </div>
  );
};

const ListWrapper = styled.li`
  background-color: ${black};
  border-radius: ${stdBR};
  padding: ${stdSpace};
  border: 2px solid ${grey2};
  min-width: 300px;
`;

const Tasks = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 5px;
`;

const TasksWrapper = styled.div`
  overflow: auto;
  height: calc(100vh - ${footerHeight} - ${headerHeight} - 30px - 150px);

  @media (max-width: ${tabletWidthLrg}) {
    max-height: 50vh;
  }
`;

export default List;
