import { useState, useContext } from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../graphql/mutations";
import { GET_TASKS } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import TimerContext from "../../contexts/TimerContext";
import DeleteConfirmation from "../general/DeleteConfirmation";
import Card, {
  Title,
  TaskCloseIconBtn,
  CardFooter,
  DateContainer,
  DueDate,
  Options,
  DurationIconBtn,
  EditIconBtn,
  CardMain,
  CloseContainer,
} from "./Task.styles";
import TaskForm from "./TaskForm";
import LoadingContext from "../../contexts/LoadingContext";
import ErrorModal from "../ErrorModal";
import Loading from "../Loading";

const Task = (props) => {
  const { task } = props;
  const { name, dueDate } = task;

  // Extract project id associated with the task
  const { projectId } = useParams();

  const [openEditTaskForm, setOpenEditTaskForm] = useState(false);
  const [openDeleteTaskForm, setOpenDeleteTaskForm] = useState(false);

  // State to track when timer details
  const [timer, setTimer] = useContext(TimerContext);

  // Tracks if the timer is loading or not
  const [, setIsLoading] = useContext(LoadingContext);

  // Update task in the db
  const [deleteTaskMutation, deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: { projectId },
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleEditClick = () => {
    setOpenEditTaskForm(true);
  };

  const handleDeleteClick = () => {
    setOpenDeleteTaskForm(true);
  };

  const handleTimerClick = () => {
    setIsLoading(true);

    // Scenario 1: Counter is off and user is turning it on
    if (!timer.on) {
      setTimer({
        on: true,
        taskId: task._id,
        scenario: "Scenario 1",
      });
    }

    // Scenario 2 / 3: Counter is turned on
    else {
      // Scenario 2: counter is on and user is clicking the same button to toggle it off
      if (task._id === timer.taskId) {
        setTimer({ ...timer, taskId: "", scenario: "Scenario 2" });
      }

      // Scenario 3: counter is on and user is clicking a different button to transfer the counter
      else {
        // Turn off the counter to save the old task's counter
        setTimer({
          ...timer,
          taskId: task._id,
          scenario: "Scenario 3",
        });
      }
    }
  };

  // Function to create task and submit to back end
  const deleteTaskFunction = (_id) => {
    const data = { _id: _id };
    deleteTaskMutation({ variables: data });
  };

  // Error and loading states
  if (deleteTask.error) return <ErrorModal />;
  if (deleteTask.loading) return <Loading />;

  // Show task to edit
  if (openEditTaskForm)
    return (
      <TaskForm
        openEditTaskForm={openEditTaskForm}
        setOpenEditTaskForm={setOpenEditTaskForm}
        taskObj={task}
      />
    );

  // Show deletion confirmation dialogue
  if (openDeleteTaskForm)
    return (
      <DeleteConfirmation
        taskId={task._id}
        taskObj={task}
        cancel={() => setOpenDeleteTaskForm(false)}
        deleteTask={(_id) => {
          deleteTaskFunction(_id);
          setOpenDeleteTaskForm(false);
        }}
      />
    );

  return (
    <li>
      <Card>
        <CardMain>
          <Title>{name}</Title>
          <CloseContainer>
            <TaskCloseIconBtn onClick={handleDeleteClick}>
              <i className="fas fa-times">
                <span className="sr-only">Delete task</span>
              </i>
            </TaskCloseIconBtn>
          </CloseContainer>
        </CardMain>

        {/* Card Footer */}
        <CardFooter>
          <DateContainer>
            <DueDate>{moment.utc(dueDate).format("ddd, MMM Do YYYY")}</DueDate>
          </DateContainer>
          <Options>
            <DurationIconBtn onClick={handleTimerClick}>
              <i className="fas fa-stopwatch">
                <span className="sr-only">Toggle timer to track time</span>
              </i>
            </DurationIconBtn>
            <EditIconBtn onClick={handleEditClick}>
              <i className="fas fa-edit">
                <span className="sr-only">Edit task</span>
              </i>
            </EditIconBtn>
          </Options>
        </CardFooter>
      </Card>
    </li>
  );
};

export default Task;
