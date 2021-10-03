import { ListNameContainer, Name, AddIconBtn } from "./ListName.styles";

const ListName = (props) => {
  const { listName, setOpenCreateTaskForm } = props;

  return (
    <ListNameContainer>
      <Name>
        <h2>{listName}</h2>
      </Name>
      <div>
        <AddIconBtn onClick={() => setOpenCreateTaskForm(true)}>
          <i className="fas fa-plus">
            <span className="sr-only">Create a new list</span>
          </i>
        </AddIconBtn>
      </div>
    </ListNameContainer>
  );
};

export default ListName;
