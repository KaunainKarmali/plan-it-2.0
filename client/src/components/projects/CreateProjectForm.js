import { useState, useRef } from "react";
import { getTodaysDate } from "../../utils";
import {
  SubmitButton,
  SecondaryButton,
} from "../generalStyledComponents/Buttons.styles";
import {
  ModalBackground,
  ModalContainer,
  ModalHeader,
  ModalMain,
  ModalFooter,
  Heading,
  ButtonContainer,
} from "../generalStyledComponents/Modal.styles";
import InputField from "../InputField";
import CloseButton from "../general/CloseButton";

const CreateProjectForm = (props) => {
  // Used to open / close the modal
  const { setOpenCreateProjectForm, createProjectMutation } = props;

  // Generates the current date
  const today = useRef(getTodaysDate());

  // Used to track form content and store project creation details
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    startDate: today.current,
    dueDate: today.current,
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

  // Resets the user inputted values
  const handleReset = (e) => {
    // Reset the state storing form inputs
    const tempProjectDetails = {};
    Object.keys(projectDetails).forEach(
      (key) => (tempProjectDetails[key] = "")
    );

    // Reset the dates to today's date
    tempProjectDetails.startDate = today.current;
    tempProjectDetails.dueDate = today.current;

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
      createProjectMutation(projectDetails);
      setOpenCreateProjectForm(false);
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <form action="submit">
          {/* Form header */}
          <ModalHeader>
            <Heading>Create project</Heading>
            <CloseButton cb={() => setOpenCreateProjectForm(false)} />
          </ModalHeader>

          {/* Form main */}
          <ModalMain>
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
          </ModalMain>

          {/* Form footer */}
          <ModalFooter>
            <ButtonContainer>
              <SecondaryButton type="reset" onClick={handleReset}>
                Clear
              </SecondaryButton>
              <SubmitButton type="submit" onClick={handleSubmit}>
                Create
              </SubmitButton>
            </ButtonContainer>
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default CreateProjectForm;
