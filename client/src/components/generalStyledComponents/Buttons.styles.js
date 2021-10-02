import styled from "styled-components";
import { stdBR } from "../../variables/borders";
import {
  green1,
  green3,
  white1,
  black,
  grey1,
  grey5,
  blue1,
  blue4,
  red3,
  red4,
} from "../../variables/colours";
import { smlSpace } from "../../variables/spacing";
import { mobile } from "../../variables/screen";
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
  background-color: ${green1};
  padding: 10px;
  color: ${white1};
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  font-size: 1rem;
  font-weight: 700;
  border: 2px solid;
  border-color: ${green1};

  &:hover,
  &:focus-visible {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    color: ${black};
    background-color: ${green3};
    outline: none;
    border-color: ${green3};
  }

  @media (max-width: ${mobile}) {
    font-size: 0.9rem;
    padding: 8px 10px;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: ${grey5};
  color: ${blue1};
  box-shadow: none;
  border-color: ${blue1};

  &:hover,
  &:focus-visible {
    box-shadow: none;
    color: ${blue1};
    background-color: rgba(${getRGBvalue(blue1)}, 0.2);
    border-color: ${blue1};
  }
`;

export const SubmitButton = styled(PrimaryButton)`
  background-color: ${blue1};
  color: ${white1};
  border-color: ${blue1};

  &:hover,
  &:focus-visible {
    background-color: ${blue4};
    color: ${white1};
    border-color: ${blue4};
  }
`;

export const DeleteButton = styled(PrimaryButton)`
  background-color: ${red3};
  border-color: ${red3};

  &:hover,
  &:focus-visible {
    color: ${white1};
    background-color: ${red4};
    border-color: ${red4};
  }
`;

export const IconButton = styled(PrimaryButton)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${grey1};
  padding: 5px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border-color: ${grey1};

  &:hover,
  &:focus-visible {
    color: ${grey1};
    outline: none;
    border-color: ${grey1};
  }
`;

export const CloseIcon = styled(IconButton)`
  background-color: transparent;
  color: ${blue1};
  border-color: transparent;
  box-shadow: none;
  padding: 10px;
  margin-right: -10px;
  margin-top: -10px;

  &:hover,
  &:focus {
    color: ${red4};
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }
`;
