import styled from "styled-components/macro";
import { useState } from "react";
import { blue1, white1 } from "../variables/colours";
import { stdBR } from "../variables/borders";
import { stdSpace } from "../variables/spacing";
import {
  CloseIconBtn,
  PrimaryButton,
  SecondaryButton,
} from "./styledComponents/Buttons.styles";
import { ModalInner, ModalOuter } from "./styledComponents/Modal.styles";
import InputField from "./InputField";
import { mobile, tablet } from "../variables/screen";

// TODO: Refactor styles with CreateProjectForm component
const CreateListForm = (props) => {
  const { createList, setOpenCreateListForm } = props;

  // Used to track form content and store project creation details
  const [listName, setListName] = useState("");

  // Tracks if the form inputs are valid
  const [isValid, setIsValid] = useState(true);

  // Close modal
  const handleClose = () => {
    setOpenCreateListForm(false);
  };

  // Track changes in the input
  const handleChange = (e) => {
    const value = e.target.value;
    setListName(value);
    setIsValid(value !== "" ? true : false);
  };

  const handleReset = () => {
    setListName("");
    setIsValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Track and check if inputs are valid before submitting
    const readyToSubmit = listName !== "" ? true : false;

    // Change valid state to false if it is not ready to submit
    if (!readyToSubmit) {
      setIsValid(false);
    } else {
      // Create list in the back end if validations are complete
      createList(listName);
      // Close modal
      setOpenCreateListForm(false);
    }
  };

  return (
    <ModalOuter>
      <ModalInner>
        <form action="submit">
          {/* Form header */}
          <FormHeader>
            <Title>Create a new list</Title>
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
                value={listName}
                onChange={handleChange}
                isValid={isValid}
                inputLength={listName.length}
                label="List name"
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
  );
};

export default CreateListForm;

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
