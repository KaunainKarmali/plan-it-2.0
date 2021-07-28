import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../firebase";
import { black, blue1, grey3, grey4, grey5 } from "../variables/colours";
import { medSpace, smlSpace, stdSpace } from "../variables/spacing";
import { stdBR } from "../variables/borders";

import { ModalOuter, ModalInner } from "./Modal.styles";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { mobile, tablet } from "../variables/screen";

const DeleteConfirmation = (props) => {
  const { taskId, taskObj, setDeleteTask } = props;

  // Hold dbref between re-renders
  const dbRef = useRef(null);

  useEffect(() => {
    // Create reference to firebase db on mount
    dbRef.current = firebase.database().ref("tasks/" + taskId);
  }, []);

  const handleDeleteClick = () => {
    console.log("delete task");
    console.log(taskId);
    dbRef.current.remove();
    setDeleteTask(false);
  };

  const handleCancelClick = () => {
    setDeleteTask(false);
  };

  return (
    <ModalOuter>
      <CustomModalInner>
        <Header>
          <Heading>Delete task</Heading>
          <WarningMessage>
            Please confirm these details before deleting this task
          </WarningMessage>
        </Header>
        <Main>
          <Title>Task title</Title>
          <TaskTitle>{taskObj.title}</TaskTitle>
          <Title>Task description</Title>
          <TaskDescription>{taskObj.description}</TaskDescription>
        </Main>
        <Footer>
          <CustomSecondaryButton onClick={handleCancelClick}>
            Cancel
          </CustomSecondaryButton>
          <PrimaryButton onClick={handleDeleteClick}>Delete</PrimaryButton>
        </Footer>
      </CustomModalInner>
    </ModalOuter>
  );
};

// Modal styles
const CustomModalInner = styled(ModalInner)`
  padding: 0;
  max-width: 80vw;
  width: auto;
`;

const StandardWrapper = styled.div`
  padding: 20px 30px;

  @media (max-width: ${tablet}) {
    padding: 20px 20px;
  }
`;

// Header styles
const Header = styled(StandardWrapper)`
  border-top-left-radius: ${stdBR};
  border-top-right-radius: ${stdBR};
  background-color: ${grey5};
  border-bottom: 1px solid ${grey4};
`;

const Heading = styled.h4`
  color: ${blue1};
  font-size: 1.5rem;
  margin-bottom: ${stdSpace};
`;

const WarningMessage = styled.p`
  color: ${grey3};
  font-size: 1rem;
`;

// Main styles
const Main = styled(StandardWrapper)`
  overflow-y: auto;
  max-height: 55vh;

  /* Whole scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    height: 3px;
    background: ${blue1};
    border-radius: ${stdBR};
  }
`;

const Title = styled(WarningMessage)`
  color: ${grey3};
  font-size: 1rem;
  margin-bottom: ${smlSpace};
`;

const TaskTitle = styled(WarningMessage)`
  font-size: 1rem;
  margin-bottom: 25px;
  color: ${black};
`;

const TaskDescription = styled(TaskTitle)`
  margin-bottom: 0;
  width: 90%;

  @media (max-width: ${tablet}) {
    width: 100%;
  }
`;

// Footer styles
const Footer = styled(StandardWrapper)`
  border-bottom-left-radius: ${stdBR};
  border-bottom-right-radius: ${stdBR};
  background-color: ${grey5};
  border-top: 1px solid ${grey4};
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${mobile}) {
    justify-content: center;
  }
`;

const CustomSecondaryButton = styled(SecondaryButton)`
  background-color: ${grey5};
  margin-right: ${medSpace};

  @media (max-width: ${mobile}) {
    margin-right: 5px;
  }
`;

export default DeleteConfirmation;
