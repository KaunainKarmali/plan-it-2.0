import {
  ModalBackground,
  ModalContainer,
  ModalHeader,
  Heading,
  ModalMain,
  ModalFooter,
} from "../generalStyledComponents/Modal.styles";
import {
  DeleteButton,
  SecondaryButton,
} from "../generalStyledComponents/Buttons.styles";
import {
  WarningMessage,
  Title,
  TaskName,
  TaskDescription,
} from "./DeleteConfirmation.styles";

const DeleteConfirmation = (props) => {
  const { taskObj, deleteTask, cancel } = props;

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <Heading>Delete task</Heading>
          <WarningMessage>
            Please confirm these details before deleting this task
          </WarningMessage>
        </ModalHeader>
        <ModalMain>
          <Title>Task name</Title>
          <TaskName>{taskObj.name}</TaskName>
          <Title>Task description</Title>
          <TaskDescription>{taskObj.description}</TaskDescription>
        </ModalMain>
        <ModalFooter>
          <SecondaryButton onClick={() => cancel()}>Cancel</SecondaryButton>
          <DeleteButton onClick={() => deleteTask(taskObj._id)}>
            Delete
          </DeleteButton>
        </ModalFooter>
      </ModalContainer>
    </ModalBackground>
  );
};

export default DeleteConfirmation;
