import styled from "styled-components";
import { stdBR } from "../../variables/borders";
import { black, grey2 } from "../../variables/colours";
import { footerHeight, headerHeight } from "../../variables/heights";
import { stdSpace } from "../../variables/spacing";
import { tabletWidthLrg } from "../../variables/widths";
import ListTitle from "./ListTitle";
import { mobile } from "../../variables/screen";

const List = (props) => {
  const { list, setOpenCreateTaskForm } = props;

  return (
    <div>
      <ListWrapper>
        <ListTitle
          list={list.name}
          setOpenCreateTaskForm={setOpenCreateTaskForm}
        />
        <TasksWrapper>
          <Tasks>
            {/* {tasks && tasks.map((task) => <Task key={task._id} task={task} />)} */}
          </Tasks>
        </TasksWrapper>
      </ListWrapper>
    </div>
  );
};

const ListWrapper = styled.li`
  background-color: ${black};
  border-radius: ${stdBR};
  padding: ${stdSpace};
  border: 2px solid ${grey2};
  min-width: 300px;

  @media (max-width: ${mobile}) {
    min-width: 95%;
  }
`;

const Tasks = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 5px;
`;

const TasksWrapper = styled.div`
  overflow: auto;
  height: calc(100vh - ${footerHeight} - ${headerHeight} - 30px - 160px);

  @media (max-width: ${tabletWidthLrg}) {
    max-height: 50vh;
    height: auto;
  }
`;

export default List;
