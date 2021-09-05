import styled from "styled-components";
import { stdBR } from "../variables/borders";
import { black, grey2 } from "../variables/colours";
import { footerHeight, headerHeight } from "../variables/heights";
import { stdSpace } from "../variables/spacing";
import { tabletWidthLrg } from "../variables/widths";
import ListTitle from "./ListTitle";
import Task from "./Task";

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
