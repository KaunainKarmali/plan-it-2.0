import { useState } from "react";
import styled, { css } from "styled-components/macro";
import {
  black,
  blue3,
  green1,
  grey3,
  grey4,
  orange1,
  purple1,
  red1,
  white2,
} from "../variables/colours";
import { smlSpace, stdSpace } from "../variables/spacing";
import { IconButton } from "./Buttons";
import TaskForm from "./TaskForm";

const ListTitle = (props) => {
  const { list } = props;

  const [openTask, setOpenTask] = useState(false);

  const handleAddClick = () => {
    setOpenTask(true);
  };

  return (
    <ListTitleWrapper list={list}>
      <TitleContainer>
        <DragIconBtn>
          <i className="fas fa-grip-vertical"></i>
        </DragIconBtn>
        <h2>{list}</h2>
      </TitleContainer>
      <AddIconBtn onClick={handleAddClick}>
        <i className="fas fa-plus"></i>
      </AddIconBtn>
      <OptionsIconBtn>
        <i className="fas fa-ellipsis-h"></i>
      </OptionsIconBtn>
      {openTask && <TaskForm openTask={openTask} setOpenTask={setOpenTask} />}
    </ListTitleWrapper>
  );
};

const ListTitleWrapper = styled.div`
  display: flex;
  padding: ${stdSpace};
  margin-bottom: ${stdSpace};
  text-transform: capitalize;
  border-bottom: 3px solid;

  /* Set the color theme for the title */
  ${({ list }) => {
    if (list === "to do") {
      return css`
        color: ${red1};
        border-bottom-color: ${red1};
      `;
    } else if (list === "doing") {
      return css`
        color: ${orange1};
        border-bottom-color: ${orange1};
      `;
    } else if (list === "done") {
      return css`
        color: ${green1};
        border-bottom-color: ${green1};
      `;
    } else {
      return css`
        color: ${purple1};
        border-bottom-color: ${purple1};
      `;
    }
  }}
`;

const TitleContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const DragIconBtn = styled(IconButton)`
  font-size: 1rem;
  margin-right: ${stdSpace};
  padding-left: 0px;
  padding-right: 0px;

  background-color: ${black};
  color: ${grey3};

  &:hover,
  &:focus {
    color: ${grey4};
    background-color: ${black};
  }
`;

const AddIconBtn = styled(IconButton)`
  margin-right: ${smlSpace};
  color: ${blue3};

  &:hover,
  &:focus {
    background-color: ${blue3};
  }
`;

const OptionsIconBtn = styled(IconButton)`
  color: ${blue3};
  &:hover,
  &:focus {
    background-color: ${blue3};
  }
`;

export default ListTitle;
