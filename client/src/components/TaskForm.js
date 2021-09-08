import styled from "styled-components/macro";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { blue1 } from "../variables/colours";
import { getTodaysDate } from "../utils";
import { stdBR } from "../variables/borders";
import { stdSpace } from "../variables/spacing";
import {
  PrimaryButton,
  SecondaryButton,
} from "./styledComponents/Buttons.styles";
import { ModalInner, ModalOuter } from "./styledComponents/Modal.styles";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import Dropdown from "./Dropdown";
import { mobile, tablet } from "../variables/screen";
import ClosePopup from "./ClosePopup";
import FormTitle from "./styledComponents/FormTitle.styles";
import { serverUrl } from "../settings";
import priorityOptions from "../variables/priority";
import ErrorModal from "./ErrorModal";

const TaskForm = (props) => {
  const { setOpenCreateTaskForm, createTask } = props;

  // Retrieve the project id that the tasks are associated with
  const { projectId } = useParams();

  // Stores today's date
  const today = getTodaysDate();

  const [error, setError] = useState(false);

  // Saves the list names of all the lists created under a given project
  const [listOptions, setListOptions] = useState([]);

  // Tracks if the form inputs
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    listId: "",
    dueDate: today,
    creationDate: today,
  });

  // Tracks if the form inputs are valid
  const [isValid, setIsValid] = useState({
    title: true,
    description: true,
    priority: true,
    listId: true,
    dueDate: true,
    creationDate: true,
  });

  // Retrieve all the list names in a given project
  useEffect(() => {
    if (projectId !== undefined) {
      const url = new URL(`${serverUrl}/list/get-lists`);
      const params = { projectId: projectId };
      url.search = new URLSearchParams(params).toString();

      fetch(url)
        .then((res) => {
          // Check if response was successful
          if (res.ok) {
            // If projects were found, 200 status is returned
            if (res.status === 200) {
              return res.json();
            }

            // If request was successful, but project cannot be found, return false to indicate that no project was found
            else {
              throw new Error(res.status);
            }
          }

          // Throw error if errors are found
          else {
            throw new Error(res.status);
          }
        })
        .then((res) => {
          // Save list names for a given project to be rendered to the user
          const listNamesTemp = [];
          res.forEach((list) => {
            const listObj = {
              name: list.listName,
              value: list._id,
            };
            listNamesTemp.push(listObj);
          });
          setListOptions(listNamesTemp);
        })
        .catch((error) => {
          // If errors are found, generate an error message and update error state to display error to user
          const status = parseInt(error.message);
          let message = "";

          if (status === 500) {
            message = "Lists cannot be found. Please try again later.";
          } else if (status === 400) {
            message =
              "Project ID was not provided. Please contact the database administrator.";
          } else {
            message = "An error occurred while retrieving your lists.";
          }

          setError({ error: true, message: message });
        });
    }
  }, [projectId]);

  // Update state on changes to form element
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // Update form input
    setTask({
      ...task,
      [name]: value,
    });

    // Update validation check
    setIsValid({
      ...isValid,
      [name]: value !== "" ? true : false,
    });
  };

  // TODO: Update validation for dates to match project form
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {}; // errors object
    const taskInputs = { ...task }; // copy of task state

    // Loop through all user inputs and update errors object to flag inputs that failed validation
    for (const property in taskInputs) {
      if (taskInputs[property] === "") {
        validationErrors[property] = false;
      }
    }

    // Update validation state if errors are found, otherwise submit form
    if (Object.keys(validationErrors).length !== 0) {
      setIsValid({ ...isValid, ...validationErrors });
    } else {
      createTask(task);
      handleReset();
    }
  };

  const handleReset = () => {
    setTask({
      title: "",
      description: "",
      priority: "low",
      listId: "",
      dueDate: today,
      creationDate: today,
    });

    setIsValid({
      title: true,
      description: true,
      priority: true,
      listId: true,
      dueDate: true,
      creationDate: true,
    });
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpenCreateTaskForm(false);
  };

  return (
    <div>
      <ModalOuter>
        <ModalInner>
          <form action="submit">
            {/* Form header */}
            <FormHeader>
              <FormTitle>Create a new task</FormTitle>
              <ClosePopup handleClose={handleClose} />
            </FormHeader>

            {/* Form main */}
            <FormMainWrapper>
              <FormMain>
                <InputField
                  type="text"
                  id="title"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  isValid={isValid.title}
                  inputLength={task.title.length}
                  label="Task title"
                />
                <TextareaField
                  id="description"
                  name="description"
                  rows="5"
                  value={task.description}
                  onChange={handleChange}
                  isValid={isValid.description}
                  inputLength={task.description.length}
                  label="Description"
                />
                <DropdownContainer>
                  <Dropdown
                    type="text"
                    id="priority"
                    name="priority"
                    onChange={handleChange}
                    isValid={isValid.priority}
                    value={task.priority}
                    options={priorityOptions}
                    inputLength={task.priority.length}
                    label="Priority"
                  />

                  <Dropdown
                    id="listId"
                    name="listId"
                    onChange={handleChange}
                    isValid={isValid.listId}
                    value={task.listId}
                    options={listOptions}
                    inputLength={task.listId.length}
                    label="List"
                  />
                </DropdownContainer>

                <InputField
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  isValid={isValid.dueDate}
                  inputLength={task.dueDate.length}
                  label="Due date"
                />
              </FormMain>
            </FormMainWrapper>

            {/* Form footer */}
            <FormFooter>
              <ButtonContainer>
                <ClearButton type="reset" onClick={handleReset}>
                  Clear
                </ClearButton>
              </ButtonContainer>
              <CreateButton type="submit" onClick={handleSubmit}>
                Create
              </CreateButton>
            </FormFooter>
          </form>
        </ModalInner>
      </ModalOuter>
      {error.error && <ErrorModal error={error} setError={setError} />}
    </div>
  );
};

const FormHeader = styled.div`
  margin-bottom: ${stdSpace};
`;

const FormMainWrapper = styled.div`
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

const FormFooter = styled.div`
  text-align: right;
  margin-top: ${stdSpace};
  margin-right: 5px;

  @media (max-width: ${mobile}) {
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: inline-block;
  margin-right: 20px;

  @media (max-width: ${tablet}) {
    margin: 0px;
    display: block;
  }
`;

const DropdownContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  column-gap: 20px;
  justify-content: space-between;

  @media (max-width: ${tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: 2fr;
  }
`;

const FormMain = styled.div`
  margin-right: 5px;
`;

const CreateButton = styled(PrimaryButton)`
  @media (max-width: ${tablet}) {
    margin-top: 10px;
    width: 100%;
  }
`;

const ClearButton = styled(SecondaryButton)`
  @media (max-width: ${tablet}) {
    margin-top: 10px;
    width: 100%;
  }
`;

export default TaskForm;
