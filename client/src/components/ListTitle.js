import styled from "styled-components";
import { blue3, red1, black } from "../variables/colours";
import { smlSpace, stdSpace } from "../variables/spacing";
import { IconButton } from "./styledComponents/Buttons.styles";

const ListTitle = (props) => {
  const { list, setOpenCreateTaskForm } = props;

  const handleAddClick = () => {
    setOpenCreateTaskForm(true);
  };

  return (
    <ListTitleWrapper list={list}>
      <TitleContainer>
        <h2>{list}</h2>
      </TitleContainer>
      <AddIconBtn onClick={handleAddClick}>
        <i className="fas fa-plus"></i>
      </AddIconBtn>
    </ListTitleWrapper>
  );
};

const ListTitleWrapper = styled.div`
  display: flex;
  padding: ${stdSpace} 0px;
  margin-bottom: ${stdSpace};
  text-transform: capitalize;
  border-bottom: 3px solid;
  color: ${red1};
  border-bottom-color: ${red1};
`;

const TitleContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const AddIconBtn = styled(IconButton)`
  margin-right: ${smlSpace};
  color: ${red1};
  background-color: ${black};

  &:hover,
  &:focus-visible {
    background-color: ${red1};
    color: ${black};
  }
`;

export default ListTitle;
