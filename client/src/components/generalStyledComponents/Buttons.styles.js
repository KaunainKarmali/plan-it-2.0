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

  &:hover,
  &:focus-visible {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    color: ${black};
    background-color: ${green3};
    outline: none;
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

  &:hover,
  &:focus-visible {
    box-shadow: none;
    color: ${blue1};
    background-color: rgba(${getRGBvalue(blue1)}, 0.2);
  }
`;

export const AlternativeButton = styled(PrimaryButton)`
  background-color: ${grey5};
  color: ${blue1};
  box-shadow: none;

  &:hover,
  &:focus-visible {
    box-shadow: none;
    color: ${blue1};
    background-color: rgba(${getRGBvalue(blue1)}, 0.2);
  }
`;

// const SecondaryButton = styled(SecondaryButton)`
/* background-color: ${grey5}; */
/* margin-right: ${medSpace}; */

/* @media (max-width: ${mobile}) {
    margin-right: 5px;
  } */
// `;

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

  &:hover,
  &:focus-visible {
    color: ${grey1};
    outline: none;
  }
`;
