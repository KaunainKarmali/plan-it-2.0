import { useState, useContext } from "react";
import moment from "moment";
import TimerContext from "../../contexts/TimerContext";
import DeleteConfirmation from "../DeleteConfirmation";
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
import CreateTaskForm from "../CreateTaskForm";
import LoadingContext from "../../contexts/LoadingContext";

const Task = (props) => {
  const { task } = props;
  const { name, dueDate } = task;

  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  // State to track when timer details
  const [timer, setTimer] = useContext(TimerContext);

  // Tracks if the timer is loading or not
  const [, setIsLoading] = useContext(LoadingContext);

  const handleEditClick = () => {
    setEditTask(true);
  };

  const handleDeleteClick = () => {
    setDeleteTask(true);
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

  // Show task to edit
  if (editTask)
    return (
      <CreateTaskForm
        editTask={editTask}
        setEditTask={setEditTask}
        taskObj={task}
        // taskId={task._id}
      />
    );

  // Show deletion confirmation dialogue
  if (deleteTask)
    return (
      <DeleteConfirmation
        taskId={task._id}
        taskObj={task}
        setDeleteTask={setDeleteTask}
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
            <DueDate>{moment(dueDate).format("ddd, MMM Do YYYY")}</DueDate>
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
