import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../graphql/mutations";
import { GET_TASKS } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import {
  ModalBackground,
  ModalContainer,
  Heading,
  ModalMain,
  ModalFooter,
  ButtonContainer,
} from "../general/Modal.styles";
import { DeleteButton, SecondaryButton } from "../general/Buttons.styles";
import {
  ModalHeaderModified,
  WarningMessage,
  Title,
  TaskName,
  TaskDescription,
} from "./DeleteTask.styles";
import ErrorModal from "../general/ErrorModal";
import Loading from "../general/Loading";

const DeleteTask = (props) => {
  const { taskObj, closeForm } = props;

  // Extract project id associated with the task
  const { projectId } = useParams();

  // Delete task in the db
  const [deleteTaskMutation, deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: { projectId },
      },
    ],
    awaitRefetchQueries: true,
  });

  // Function to create task and submit to back end
  const deleteTaskFunction = (_id) => {
    const data = { _id: _id };
    deleteTaskMutation({ variables: data });
  };

  const handleDeleteClick = () => {
    deleteTaskFunction(taskObj._id);
    closeForm();
  };

  // Error and loading states
  if (deleteTask.error) return <ErrorModal />;
  if (deleteTask.loading) return <Loading />;

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeaderModified>
          <Heading>Delete task</Heading>
          <WarningMessage>
            Please confirm these details before deleting this task
          </WarningMessage>
        </ModalHeaderModified>
        <ModalMain>
          <Title>Task name</Title>
          <TaskName>{taskObj.name}</TaskName>
          <Title>Task description</Title>
          <TaskDescription>{taskObj.description}</TaskDescription>
        </ModalMain>
        <ModalFooter>
          <ButtonContainer>
            <SecondaryButton onClick={() => closeForm()}>
              Cancel
            </SecondaryButton>
            <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
          </ButtonContainer>
        </ModalFooter>
      </ModalContainer>
    </ModalBackground>
  );
};

export default DeleteTask;
