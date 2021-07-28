import styled from "styled-components";
import { stdBR } from "../variables/borders";
import {
  black,
  blue1,
  blue3,
  blue4,
  blue5,
  grey1,
  white1,
} from "../variables/colours";
import { smlSpace, stdSpace } from "../variables/spacing";
import { getRGBvalue } from "../utils";

const Button = styled.button`
  border: none;
  cursor: pointer;
  border-radius: ${stdBR};
  padding: ${smlSpace};
  transition: 0.2s all ease-in-out;
  display: inline-block;
`;

export const PrimaryButton = styled(Button)`
  background-color: ${blue1};
  padding: 10px 20px;
  color: ${white1};
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  font-size: 0.9rem;

  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    color: ${white1};
    background-color: ${blue4};
    outline: none;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: ${white1};
  color: ${blue1};
  box-shadow: none;

  &:hover,
  &:focus,
  &:active {
    box-shadow: none;
    color: ${blue1};
    background-color: rgba(${getRGBvalue(blue1)}, 0.2);
  }
`;

export const IconButton = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${grey1};

  &:hover,
  &:active,
  &:focus-visible,
  &:focus {
    color: ${grey1};
    outline: none;
  }
`;

export const CloseIconBtn = styled(IconButton)`
  color: ${blue3};
  font-size: 0.9rem;
  margin: ${smlSpace};
  right: ${smlSpace};

  &:hover,
  &:active,
  &:focus {
    background-color: ${blue3};
  }
`;

export default Button;
