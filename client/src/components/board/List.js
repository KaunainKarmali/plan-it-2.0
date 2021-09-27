import ListName from "./ListName";
import Task from "./Task";
import { ListItem, TasksContainer, TasksList } from "./List.styles";

const List = (props) => {
  const { list, setOpenCreateTaskForm, tasks } = props;

  return (
    <div>
      <ListItem>
        <ListName
          listName={list.name}
          setOpenCreateTaskForm={setOpenCreateTaskForm}
        />
        <TasksContainer>
          <TasksList>
            {tasks && tasks.map((task) => <Task key={task._id} task={task} />)}
          </TasksList>
        </TasksContainer>
      </ListItem>
    </div>
  );
};

export default List;
