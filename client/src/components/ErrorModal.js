import {
  ModalBackground,
  ModalContainer,
  ModalHeader,
  Heading,
  ModalMain,
} from "./generalStyledComponents/Modal.styles";
import { Description } from "./ErrorModal.styles";

const ErrorModal = () => {
  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <Heading>Error</Heading>
        </ModalHeader>
        <ModalMain>
          <Description>
            An error occurred when processing your request. Please try again
            later.
          </Description>
        </ModalMain>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ErrorModal;
