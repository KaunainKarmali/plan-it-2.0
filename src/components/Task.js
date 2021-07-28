import { useState } from "react";
import firebase from "../firebase";
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
  const { title, description, due } = task;
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  const handleEditClick = () => {
    setEditTask(true);
  };

  const handleDeleteClick = () => {
    setDeleteTask(true);
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
            <DueDate>{due}</DueDate>
          </DateContainer>
          <Options>
            <DurationIconBtn>
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
