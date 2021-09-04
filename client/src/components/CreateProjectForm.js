import styled from "styled-components/macro";
import { useState } from "react";
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
import { mobile } from "../variables/screen";

// TODO: Refactor with task form
const CreateProjectForm = (props) => {
  // Used to open / close the modal
  const { setOpenCreateProjectForm, createProject } = props;

  // Generates the current date
  const today = getTodaysDate();

  // Used to track form content and store project creation details
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    startDate: today,
    dueDate: today,
  });

  // Tracks if the form inputs are valid
  const [isValid, setIsValid] = useState({
    name: true,
    startDate: true,
    dueDate: true,
  });

  // Update the form's state variable to track, save, and display user inputs
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProjectDetails({ ...projectDetails, [name]: value });

    // Tracks if the input is valid or not
    let valid = null;

    // Specific validation check for due dates
    if (name === "startDate" || name === "dueDate") {
      if (projectDetails.startDate > projectDetails.dueDate) {
        valid = false;
      } else {
        valid = true;
      }
    }

    // Check if non-date inputs are empty or not
    else {
      valid = value !== "" ? true : false;
    }

    setIsValid({ ...isValid, [name]: valid });
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpenCreateProjectForm(false);
  };

  // Resets the user inputted values
  const handleReset = (e) => {
    // Reset the state storing form inputs
    const tempProjectDetails = {};
    Object.keys(projectDetails).forEach(
      (key) => (tempProjectDetails[key] = "")
    );

    // Reset the dates to today's date
    tempProjectDetails.startDate = today;
    tempProjectDetails.dueDate = today;

    // Update state
    setProjectDetails(tempProjectDetails);

    // Reset the state tracking if inputs are valid
    const tempIsValid = {};
    Object.keys(isValid).forEach((key) => (tempIsValid[key] = true));
    setIsValid(tempIsValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tracks which input is valid or not
    const tempIsValid = {};

    // Checks if any single input is not valid
    let readyToSubmit = true;

    for (const [key, value] of Object.entries(projectDetails)) {
      // Specific validation check for due dates
      if (key === "startDate" || key === "dueDate") {
        // Checks if start date is after the end date to prevent submission
        if (projectDetails.startDate > projectDetails.dueDate) {
          tempIsValid[key] = false;
          readyToSubmit = false;
        } else {
          tempIsValid[key] = true;
        }
      } else if (value === "") {
        tempIsValid[key] = false;
        readyToSubmit = false;
      } else {
        tempIsValid[key] = true;
      }
    }

    // Trigger to user if any input is not valid
    setIsValid(tempIsValid);

    // Create a project in the back end if validations pass
    if (readyToSubmit) {
      createProject(projectDetails);
      setOpenCreateProjectForm(false);
    }
  };

  return (
    <ModalOuter>
      <ModalInner>
        <form action="submit">
          {/* Form header */}
          <FormHeader>
            <Title>Create a new project</Title>
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
                id="name"
                name="name"
                value={projectDetails.name}
                onChange={handleChange}
                isValid={isValid.name}
                inputLength={projectDetails.name.length}
                label="Project name"
              />

              <InputField
                type="date"
                id="startDate"
                name="startDate"
                value={projectDetails.startDate}
                onChange={handleChange}
                isValid={isValid.startDate}
                inputLength={projectDetails.startDate.length}
                label="Start date"
              />

              <InputField
                type="date"
                id="dueDate"
                name="dueDate"
                value={projectDetails.dueDate}
                onChange={handleChange}
                isValid={isValid.dueDate}
                inputLength={projectDetails.dueDate.length}
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
              Create
            </PrimaryButton>
          </FormFooter>
        </form>
      </ModalInner>
    </ModalOuter>
  );
};

export default CreateProjectForm;

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

const FormMain = styled.div`
  margin-right: 5px;
`;
