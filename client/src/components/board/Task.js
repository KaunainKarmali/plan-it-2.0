import { useState, useContext } from "react";
import moment from "moment";
import TimerContext from "../../contexts/TimerContext";
import DeleteTask from "./DeleteTask";
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

const Task = (props) => {
  const { task } = props;
  const { name, dueDate } = task;

  const [openEditTaskForm, setOpenEditTaskForm] = useState(false);
  const [openDeleteTaskForm, setOpenDeleteTaskForm] = useState(false);

  // State to track when timer details
  const [timer, setTimer] = useContext(TimerContext);

  // Tracks if the timer is loading or not
  const [, setIsLoading] = useContext(LoadingContext);

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
      <DeleteTask
        taskId={task._id}
        taskObj={task}
        closeForm={() => setOpenDeleteTaskForm(false)}
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
