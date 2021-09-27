import { ListNameContainer, Name, AddIconBtn } from "./ListName.styles";

const ListName = (props) => {
  const { listName, setOpenCreateTaskForm } = props;

  return (
    <ListNameContainer>
      <Name>
        <h2>{listName}</h2>
      </Name>
      <AddIconBtn onClick={() => setOpenCreateTaskForm(true)}>
        <span className="sr-only">Create a new list</span>
        <i className="fas fa-plus"></i>
      </AddIconBtn>
    </ListNameContainer>
  );
};

export default ListName;
