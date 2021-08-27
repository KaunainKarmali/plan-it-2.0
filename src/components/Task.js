import { useState, useContext } from "react";
import TimerContext from "../contexts/TimerContext";
import DeleteConfirmation from "./DeleteConfirmation";
import Card, {
  Title,
  Description,
  TaskCloseIconBtn,
  CardFooter,
  DateContainer,
  DateIconBtn,
  DueDate,
  Options,
  DurationIconBtn,
  EditIconBtn,
} from "./Task.styles";
import TaskForm from "./TaskForm";

const Task = (props) => {
  const { task, taskId } = props;
  const { title, description, dueDate } = task;
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  // State to track when timer details
  const [timer, setTimer] = useContext(TimerContext);

  const handleEditClick = () => {
    setEditTask(true);
  };

  const handleDeleteClick = () => {
    setDeleteTask(true);
  };

  const handleTimerClick = () => {
    // Scenario 1: Counter is off and user is turning it on
    if (!timer.on) {
      setTimer({ on: true, taskId: taskId });
    }

    // Scenario 2 / 3: Counter is turned on
    else {
      // Scenario 2: counter is on and user is clicking the same button to toggle it off
      if (taskId === timer.taskId) {
        setTimer({ ...timer, on: false });
      }

      // Scenario 3: counter is on and user is clicking a different button to transfer the counter
      else {
        // Turn off the counter to save the old task's counter
        setTimer({ on: true, taskId: taskId });
      }
    }
  };

  return (
    <li>
      <Card>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <TaskCloseIconBtn onClick={handleDeleteClick}>
          <i className="fas fa-times" />
        </TaskCloseIconBtn>

        {/* Card Footer */}
        <CardFooter>
          <DateContainer>
            <DateIconBtn>
              <i className="fas fa-calendar-alt" />
            </DateIconBtn>
            <DueDate>{dueDate}</DueDate>
          </DateContainer>
          <Options>
            <DurationIconBtn onClick={handleTimerClick}>
              <i className="fas fa-stopwatch" />
            </DurationIconBtn>
            <EditIconBtn onClick={handleEditClick}>
              <i className="fas fa-edit" />
            </EditIconBtn>
          </Options>
        </CardFooter>
      </Card>

      {/* Show task to edit if user decides to edit */}
      {editTask && (
        <TaskForm
          editTask={editTask}
          setEditTask={setEditTask}
          taskObj={task}
          taskId={taskId}
        />
      )}

      {/* Show deletion confirmation dialogue */}
      {deleteTask && (
        <DeleteConfirmation
          taskId={taskId}
          taskObj={task}
          setDeleteTask={setDeleteTask}
        />
      )}
    </li>
  );
};

export default Task;
