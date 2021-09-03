import styled from "styled-components/macro";
import { useState, useEffect, useRef } from "react";
import firebase from "../firebase";
import { blue1, white1 } from "../variables/colours";
import { getTodaysDate } from "../utils";
import { stdBR } from "../variables/borders";
import { stdSpace } from "../variables/spacing";
import {
  CloseIconBtn,
  PrimaryButton,
  SecondaryButton,
} from "./styledComponents/Buttons.styles";
import { ModalInner, ModalOuter } from "./styledComponents/Modal.styles";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import Dropdown from "./Dropdown";
import { mobile, tablet } from "../variables/screen";

const TaskForm = (props) => {
  const { openTask, setOpenTask, editTask, setEditTask, taskObj, taskId } =
    props;

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

  // Hold dbref between re-renders
  const dbRef = useRef(null);

  useEffect(() => {
    // Create reference to firebase db on mount
    dbRef.current = firebase.database().ref("tasks/");

    // Set task if its an edit operation
    if (editTask) {
      setTask(taskObj);
    }
  }, [editTask, taskObj]);

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
      // Create a new task if its a new task
      if (openTask) {
        // Submit to firebase
        const newRef = dbRef.current.push();
        newRef.set(task, (error) => {
          if (error) {
            // TODO: Error handling if data is not saved, create prompt to user
          } else {
            // Reset form and states after submit
            handleReset();
          }
        });
      }

      // update the existing task on firebase
      else {
        const response = dbRef.current.child(taskId).update(task);
        response.then(() => {
          handleReset();
        });
      }
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

  const handleClose = (e) => {
    e.preventDefault();
    openTask && setOpenTask(false);
    editTask && setEditTask(false);
  };

  return (
    <ModalOuter>
      <ModalInner>
        <form action="submit">
          {/* Form header */}
          <FormHeader>
            <Title>{editTask ? "Edit task" : "Create a new task"}</Title>
            <TaskFormCloseIconBtn onClick={handleClose}>
              <i className="fas fa-times"></i>
              <span className="sr-only">Close modal</span>
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
              />
            </FormMain>
          </FormMainWrapper>

          {/* Form footer */}
          <FormFooter>
            <ButtonContainer>
              <SecondaryButton type="reset" onClick={handleReset}>
                Clear
              </SecondaryButton>
            </ButtonContainer>
            <PrimaryButton type="submit" onClick={handleSubmit}>
              {editTask ? "Edit" : "Create"}
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
`;

const TaskFormCloseIconBtn = styled(CloseIconBtn)`
  background-color: transparent;
  color: ${blue1};
  position: absolute;
  margin: 30px 50px;

  top: 0;
  right: 0;

  &:hover,
  &:focus {
    color: ${white1};
    background-color: ${blue1};
  }

  @media (max-width: ${mobile}) {
    margin: 20px 30px;
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  color: ${blue1};
  margin-bottom: ${stdSpace};

  @media (max-width: ${mobile}) {
    font-size: 1.5rem;
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

export default TaskForm;
