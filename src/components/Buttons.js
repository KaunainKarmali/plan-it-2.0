import styled from "styled-components";
import { stdBR } from "../variables/borders";
import {
  black,
  blue1,
  blue3,
  blue4,
  grey1,
  white1,
} from "../variables/colours";
import { smlSpace, stdSpace } from "../variables/spacing";

const Button = styled.button`
  border: none;
  cursor: pointer;
  border-radius: ${stdBR};
  padding: ${smlSpace};
  transition: 0.3s all linear;
`;

export const PrimaryButton = styled(Button)`
  background-color: ${blue1};
  padding: ${stdSpace};
  color: ${blue1};
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid ${blue1};

  &:hover,
  &:active {
    color: ${white1};
    background-color: ${blue4};
  }
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
