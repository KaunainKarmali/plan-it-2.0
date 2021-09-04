import styled from "styled-components";
import { black, blue1, grey3, grey4, grey5 } from "../variables/colours";
import { stdSpace } from "../variables/spacing";
import { stdBR } from "../variables/borders";
import { ModalOuter, ModalInner } from "./styledComponents/Modal.styles";
import { tablet } from "../variables/screen";
import ClosePopup from "./ClosePopup";

// TODO: Refactor styles with DeleteConfirmation component
const ErrorModal = (props) => {
  const { error, setError } = props;

  const handleClose = () => {
    setError({ error: false, message: "" });
  };

  return (
    <ModalOuter>
      <CustomModalInner>
        <Header>
          <Heading>Error</Heading>
          <ClosePopup handleClose={handleClose} />
        </Header>
        <Main>
          <TaskDescription>{error.message}</TaskDescription>
        </Main>
      </CustomModalInner>
    </ModalOuter>
  );
};

export default ErrorModal;

// Modal styles
const CustomModalInner = styled(ModalInner)`
  padding: 0;
  max-width: 80vw;
  width: auto;
`;

const StandardWrapper = styled.div`
  padding: 20px 30px;

  @media (max-width: ${tablet}) {
    padding: 20px 20px;
  }
`;

// Header styles
const Header = styled(StandardWrapper)`
  border-top-left-radius: ${stdBR};
  border-top-right-radius: ${stdBR};
  background-color: ${grey5};
  border-bottom: 1px solid ${grey4};
`;

const Heading = styled.h4`
  color: ${blue1};
  font-size: 1.5rem;
  margin-bottom: ${stdSpace};
`;

const WarningMessage = styled.p`
  color: ${grey3};
  font-size: 1rem;
`;

// Main styles
const Main = styled(StandardWrapper)`
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

const TaskTitle = styled(WarningMessage)`
  font-size: 1rem;
  margin-bottom: 25px;
  color: ${black};
`;

const TaskDescription = styled(TaskTitle)`
  margin-bottom: 0;
  width: 90%;

  @media (max-width: ${tablet}) {
    width: 100%;
  }
`;
