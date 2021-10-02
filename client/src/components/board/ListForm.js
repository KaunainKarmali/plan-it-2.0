import { useState } from "react";
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
import CloseButton from "../general/CloseButton";
import InputField from "../InputField";

const ListForm = (props) => {
  const { createList, setOpenCreateListForm } = props;

  // Used to track form content and store project creation details
  const [listName, setListName] = useState("");

  // Tracks if the form inputs are valid
  const [isValid, setIsValid] = useState(true);

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
    <ModalBackground>
      <ModalContainer>
        <form action="submit">
          {/* Form header */}
          <ModalHeader>
            <Heading>Create list</Heading>
            <CloseButton cb={() => setOpenCreateListForm(false)} />
          </ModalHeader>

          {/* Form main */}
          <ModalMain>
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

export default ListForm;
