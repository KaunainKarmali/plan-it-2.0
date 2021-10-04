import {
  ListNameContainer,
  Name,
  AddIconBtn,
  ButtonContainer,
} from "./ListName.styles";

const ListName = (props) => {
  const { listName, setOpenCreateTaskForm } = props;

  return (
    <ListNameContainer>
      <Name>
        <h2>{listName}</h2>
      </Name>
      <ButtonContainer>
        <AddIconBtn onClick={() => setOpenCreateTaskForm(true)}>
          <i className="fas fa-plus">
            <span className="sr-only">Create a new list</span>
          </i>
        </AddIconBtn>
      </ButtonContainer>
    </ListNameContainer>
  );
};

export default ListName;
