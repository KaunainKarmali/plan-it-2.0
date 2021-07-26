import styled, { css } from "styled-components/macro";
import { useState } from "react";
import {
  black,
  blue1,
  blue2,
  blue3,
  green1,
  grey1,
  orange1,
  orange2,
  red1,
  white1,
} from "../variables/colours";
import { getRGBvalue, getTodaysDate } from "../utils";
import { stdBR } from "../variables/borders";
import { medSpace, smlSpace, stdSpace } from "../variables/spacing";
import { white } from "jest-matcher-utils/node_modules/chalk";
import Button, { CloseIconBtn } from "./Buttons";

const TaskForm = () => {
  const today = getTodaysDate();

  // Tracks if the form inputs
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    list: "",
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

  const handleReset = (e) => {
    setTask({
      title: "",
      description: "",
      priority: "",
      list: "",
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
    <Wrapper>
      <FormWrapper>
        <form action="submit">
          {/* Form header */}
          <FormHeader>
            <Title>Create a new task</Title>
            <TaskFormCloseIconBtn>
              <i className="fas fa-times"></i>
            </TaskFormCloseIconBtn>
          </FormHeader>

          {/* Form main */}
          <FormMain>
            <label htmlFor="title" className="sr-only">
              Task title
            </label>
            <FormInput
              type="text"
              id="title"
              name="title"
              placeholder="Task title..."
              value={task.title}
              onChange={handleChange}
              isValid={isValid.title}
            />

            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Description..."
              rows="5"
              value={task.description}
              onChange={handleChange}
              isValid={isValid.description}
            />

            <label htmlFor="priority" className="sr-only">
              Priority
            </label>

            <Select
              type="text"
              id="priority"
              name="priority"
              onChange={handleChange}
              isValid={isValid.priority}
            >
              <option value="notSelected" selected disabled>
                Select priority
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>

            <label htmlFor="list" className="sr-only">
              List
            </label>
            <Select
              type="text"
              id="list"
              name="list"
              onChange={handleChange}
              isValid={isValid.list}
            >
              <option value="notSelected" selected disabled>
                Select a list
              </option>
              <option value="to do">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </Select>

            <label htmlFor="dueDate" className="sr-only">
              Due date
            </label>
            <CalendarInput
              type="date"
              id="dueDate"
              name="dueDate"
              min={today}
              value={task.dueDate}
              onChange={handleChange}
              isValid={isValid.dueDate}
            />
          </FormMain>

          {/* Form footer */}
          <FormFooter>
            <ClearButton type="reset" onClick={handleReset}>
              Clear
            </ClearButton>
            <SubmitButton type="submit" onClick={handleSubmit}>
              Create
            </SubmitButton>
          </FormFooter>
        </form>
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(${getRGBvalue(black)}, 0);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

const FormWrapper = styled.div`
  max-width: 80vw;
  max-height: 80vh;
  background-color: ${blue1};
  color: ${white};
  border-radius: ${stdBR};
  padding: ${medSpace};
  position: relative;
`;

const FormHeader = styled.div`
  margin-bottom: ${stdSpace};
`;

const FormMain = styled.div`
  overflow-y: auto;

  /* Whole scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
    height: 3px;
    margin-left: 3px;
    background-color: ${blue1};
    border-radius: ${stdBR};
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: ${stdBR};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${blue2};
    border-radius: ${stdBR};
  }
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${stdSpace};
  padding-top: ${stdSpace};
`;

const Title = styled.h3`
  font-size: 2rem;
  color: ${blue2};
  margin-bottom: ${stdSpace};
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

const FormInput = styled.input`
  border: 2px solid ${blue1};
  padding: ${smlSpace};
  width: 100%;
  margin-bottom: ${smlSpace};

  ${({ isValid }) =>
    isValid === false &&
    css`
      border: 2px solid ${red1};
    `}
`;

const Textarea = styled.textarea`
  border: 2px solid ${blue1};
  padding: ${smlSpace};

  margin-bottom: ${smlSpace};
  width: 100%;

  ${({ isValid }) =>
    isValid === false &&
    css`
      border: 2px solid ${red1};
    `}
`;

const Select = styled.select`
  border: 2px solid ${blue1};
  padding: ${smlSpace};
  margin-bottom: ${smlSpace};
  width: 50%;

  ${({ isValid }) =>
    isValid === false &&
    css`
      border: 2px solid ${red1};
    `}
`;

const CalendarInput = styled.input`
  border: 2px solid ${blue1};
  padding: ${smlSpace};
  margin-bottom: ${smlSpace};
  width: 100%;

  ${({ isValid }) =>
    isValid === false &&
    css`
      border: 2px solid ${red1};
    `}
`;

const SubmitButton = styled(Button)`
  background-color: ${blue2};
  padding: ${stdSpace};
  color: ${blue1};
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid ${blue2};

  &:hover,
  &:active {
    color: ${blue2};
    background-color: ${blue1};
  }
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

export default TaskForm;
