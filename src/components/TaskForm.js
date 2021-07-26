import styled, { css } from "styled-components/macro";
import { useState } from "react";
import { blue1, blue2, red1, white1 } from "../variables/colours";
import { getTodaysDate } from "../utils";
import { stdBR } from "../variables/borders";
import { medSpace, smlSpace, stdSpace } from "../variables/spacing";
import Button, { CloseIconBtn, PrimaryButton } from "./Buttons";
import {
  Input,
  InputContainer,
  TextLabel,
  Textarea,
  Select,
} from "./Inputs.styles";
import { ModalInner, ModalOuter } from "./Modal.styles";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import Dropdown from "./Dropdown";

const TaskForm = () => {
  const today = getTodaysDate();

  const priorityOptions = [
    { value: "low", name: "Low" },
    { value: "medium", name: "Medium" },
    { value: "high", name: "High" },
  ];

  const listOptions = [
    { value: "to do", name: "To do" },
    { value: "doing", name: "Doing" },
    { value: "done", name: "Done" },
  ];

  // Tracks if the form inputs
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    list: "to do",
    dueDate: today,
    creationDate: today,
  });

  // Tracks if the form inputs are valid
  const [isValid, setIsValid] = useState({
    title: true,
    description: true,
    priority: true,
    list: true,
    dueDate: true,
    creationDate: true,
  });

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
    if (validationErrors.length !== 0) {
      setIsValid({ ...isValid, ...validationErrors });
      console.log();
    } else {
      // submit
      console.log("no errors found");
    }
  };

  const handleReset = () => {
    setTask({
      title: "",
      description: "",
      priority: "low",
      list: "to do",
      dueDate: today,
      creationDate: today,
    });

    setIsValid({
      title: true,
      description: true,
      priority: true,
      list: true,
      dueDate: true,
      creationDate: true,
    });
  };

  return (
    <ModalOuter>
      <ModalInner>
        <form action="submit">
          {/* Form header */}
          <FormHeader>
            <Title>Create a new task</Title>
            <TaskFormCloseIconBtn>
              <i className="fas fa-times"></i>
            </TaskFormCloseIconBtn>
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
                  id="list"
                  name="list"
                  onChange={handleChange}
                  isValid={isValid.list}
                  value={task.list}
                  options={listOptions}
                  inputLength={task.list.length}
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
                labelClass={"sr-only"}
              />
            </FormMain>
          </FormMainWrapper>

          {/* Form footer */}
          <FormFooter>
            <ClearButton type="reset" onClick={handleReset}>
              Clear
            </ClearButton>
            <PrimaryButton type="submit" onClick={handleSubmit}>
              Create
            </PrimaryButton>
          </FormFooter>
        </form>
      </ModalInner>
    </ModalOuter>
  );
};

const FormHeader = styled.div`
  margin-bottom: ${stdSpace};
`;

const FormMainWrapper = styled.div`
  overflow-y: auto;
  height: 55vh;

  /* Whole scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    height: 3px;
    background: ${blue2};
    border-radius: ${stdBR};
  }
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${stdSpace};
  margin-right: 5px;
`;

const TaskFormCloseIconBtn = styled(CloseIconBtn)`
  background-color: transparent;
  color: ${blue2};
  position: absolute;
  margin: ${medSpace};
  top: 0;
  right: 0;

  &:hover,
  &:focus {
    color: ${blue1};
    background-color: ${blue2};
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  color: ${blue2};
  margin-bottom: ${stdSpace};
`;

const DropdownContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  column-gap: 20px;
  justify-content: space-between;
`;

const ClearButton = styled(Button)`
  background-color: ${blue1};
  padding: ${stdSpace};
  color: ${blue2};
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid ${blue2};
  margin-right: ${medSpace};

  &:hover,
  &:active {
    color: ${blue1};
    background-color: ${blue2};
  }
`;

const FormMain = styled.div`
  margin-right: 5px;
`;

export default TaskForm;
