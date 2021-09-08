import { useState, useContext } from "react";
import styled from "styled-components";
import TimerContext from "../contexts/TimerContext";
import DeleteConfirmation from "./DeleteConfirmation";
import Card, {
  Title,
  TaskCloseIconBtn,
  CardFooter,
  DateContainer,
  DateIconBtn,
  DueDate,
  Options,
  DurationIconBtn,
  EditIconBtn,
} from "./styledComponents/Task.styles";
import TaskForm from "./TaskForm";
import LoadingContext from "../contexts/LoadingContext";

const Task = (props) => {
  const { task } = props;
  const { title, dueDate } = task;
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

  return (
    <li>
      <Card>
        <CardMain>
          <Title>{title}</Title>
          {/* <Description>{description}</Description> */}
          <CloseContainer>
            <TaskCloseIconBtn onClick={handleDeleteClick}>
              <i className="fas fa-times" />
            </TaskCloseIconBtn>
          </CloseContainer>
        </CardMain>

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
          taskId={task._id}
        />
      )}

      {/* Show deletion confirmation dialogue */}
      {deleteTask && (
        <DeleteConfirmation
          taskId={task._id}
          taskObj={task}
          setDeleteTask={setDeleteTask}
        />
      )}
    </li>
  );
};

export default Task;

const CardMain = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CloseContainer = styled.div`
  margin-top: -5px;
  margin-right: -5px;
`;
