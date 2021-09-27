import styled from "styled-components/macro";
import { useState, useRef, useEffect } from "react";
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
import priorityOptions from "../variables/priority";

const CreateTaskForm = (props) => {
  const {
    openCreateListForm,
    setOpenCreateTaskForm,
    createTask,
    listOptions,
    editTask,
    setEditTask,
    taskObj,
  } = props;

  // Store today's date
  const today = useRef(getTodaysDate());

  // Tracks the form inputs
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "low",
    listId: "",
    dueDate: today.current,
  });

  // Tracks if the form inputs are valid
  const [isValid, setIsValid] = useState({
    name: true,
    description: true,
    priority: true,
    listId: true,
    dueDate: true,
  });

  // Update task state if user is editing
  useEffect(() => {
    if (editTask) {
      setTask({
        name: taskObj.name,
        description: taskObj.description,
        priority: taskObj.priority,
        listId: taskObj.listId,
        dueDate: taskObj.dueDate,
      });
    }
  }, [taskObj, editTask]);

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
      editTask && setEditTask(false);
    }
  };

  const handleReset = () => {
    setTask({
      name: "",
      description: "",
      priority: "low",
      listId: "",
      dueDate: today.current,
    });

    setIsValid({
      name: true,
      description: true,
      priority: true,
      listId: true,
      dueDate: true,
    });
  };

  const handleClose = (e) => {
    e.preventDefault();
    openCreateListForm && setOpenCreateTaskForm(false);
    editTask && setEditTask(false);
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
                  id="name"
                  name="name"
                  value={task.name}
                  onChange={handleChange}
                  isValid={isValid.name}
                  inputLength={task.name.length}
                  label="Task name"
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

                  {/* <Dropdown
                    id="listId"
                    name="listId"
                    onChange={handleChange}
                    isValid={isValid.listId}
                    value={task.listId}
                    options={listOptions}
                    inputLength={task.listId.length}
                    label="List"
                  /> */}
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

export default CreateTaskForm;
