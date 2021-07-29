import styled from "styled-components";
import { stdBR } from "../variables/borders";
import { black, grey2, grey3 } from "../variables/colours";
import { stdSpace } from "../variables/spacing";
import ListTitle from "./ListTitle";
import Task from "./Task";
import dummyTasks from "../dummyData/tasks";

const List = (props) => {
  const { list, tasks } = props;

  return (
    <ListWrapper>
      <ListTitle list={list} />
      <TasksWrapper>
        <Tasks>
          {tasks &&
            tasks.map((task) => (
              <Task key={task.key} taskId={task.key} task={task.value} />
            ))}
        </Tasks>
      </TasksWrapper>
    </ListWrapper>
  );
};

const ListWrapper = styled.li`
  background-color: ${black};
  border-radius: ${stdBR};
  padding: ${stdSpace};
  border: 2px solid ${grey2};

  overflow: auto;

  /* Whole scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
    height: 3px;
    margin-left: 3px;
    background-color: ${black};
    border-radius: ${stdBR};
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: ${stdBR};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${grey3};
    border-radius: ${stdBR};
  }
`;

const Tasks = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 5px;
`;

const TasksWrapper = styled.div``;

export default List;
