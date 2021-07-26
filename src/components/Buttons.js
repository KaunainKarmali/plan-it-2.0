import styled from "styled-components";
import { stdBR } from "../variables/borders";
import { black, blue3, grey1 } from "../variables/colours";
import { smlSpace } from "../variables/spacing";

const Button = styled.button`
  border: none;
  cursor: pointer;
  border-radius: ${stdBR};
  padding: ${smlSpace};
  transition: 0.3s all linear;
`;

export const IconButton = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${grey1};

  &:hover,
  &:focus {
    color: ${grey1};
  }
`;

export const CloseIconBtn = styled(IconButton)`
  color: ${blue3};
  font-size: 0.9rem;
  margin: ${smlSpace};
  right: ${smlSpace};

  &:hover,
  &:focus {
    background-color: ${blue3};
  }
`;

export default Button;
