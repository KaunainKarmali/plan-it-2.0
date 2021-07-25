import styled from "styled-components";
import { stdBR } from "../variables/borders";
import { black, grey1 } from "../variables/colours";
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

export default Button;
