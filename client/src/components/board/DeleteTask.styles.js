import styled from "styled-components";
import { black, grey3 } from "../../variables/colours";
import { smlSpace } from "../../variables/spacing";
import { tablet } from "../../variables/screen";
import { ModalHeader } from "../general/Modal.styles";

export const ModalHeaderModified = styled(ModalHeader)`
  display: block;
`;

export const WarningMessage = styled.p`
  color: ${grey3};
  font-size: 1rem;
`;

export const Title = styled(WarningMessage)`
  color: ${grey3};
  font-size: 1rem;
  margin-bottom: ${smlSpace};
`;

export const TaskName = styled(WarningMessage)`
  font-size: 1rem;
  margin-bottom: 25px;
  color: ${black};
`;

export const TaskDescription = styled(TaskName)`
  margin-bottom: 0;
  width: 90%;

  @media (max-width: ${tablet}) {
    width: 100%;
  }
`;
