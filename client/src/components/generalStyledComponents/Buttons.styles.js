import styled from "styled-components";
import { stdBR } from "../../variables/borders";
import {
  blue1,
  blue3,
  blue4,
  grey1,
  green1,
  green3,
  white1,
  black,
  grey3,
  grey4,
} from "../../variables/colours";
import { smlSpace, stdSpace } from "../../variables/spacing";
import { tablet, mobile } from "../../variables/screen";
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
