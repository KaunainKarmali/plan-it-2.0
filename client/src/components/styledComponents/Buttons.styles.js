import styled from "styled-components";
import { stdBR } from "../../variables/borders";
import {
  blue1,
  blue3,
  blue4,
  grey1,
  white1,
  black,
  grey3,
  grey4,
} from "../../variables/colours";
import { smlSpace, stdSpace } from "../../variables/spacing";
import { getRGBvalue } from "../../utils";

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
  &:focus-visible {
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
  &:focus-visible {
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
  &:focus-visible {
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
  &:focus-visible {
    background-color: ${blue3};
  }
`;

export const DragIconBtn = styled(IconButton)`
  font-size: 1rem;
  margin-right: ${stdSpace};
  padding-left: 0px;
  padding-right: 0px;
  background-color: ${black};
  color: ${grey3};

  &:hover,
  &:focus-visible {
    color: ${grey4};
    background-color: ${black};
  }
`;

export const OptionsIconBtn = styled(IconButton)`
  color: ${blue3};
  &:hover,
  &:focus-visible {
    background-color: ${blue3};
  }
`;

export default Button;
