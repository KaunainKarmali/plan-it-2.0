import styled from "styled-components";
import { stdBR } from "../../variables/borders";
import {
  blue1,
  grey3,
  grey4,
  grey5,
  white1,
  black,
  orange1,
} from "../../variables/colours";
import { mobile, tablet } from "../../variables/screen";
import { DurationIconBtn } from "./Task.styles";

export const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 10px;
  margin-left: 10px;
  width: 175px;
  z-index: 10;
`;

export const StandardWrapper = styled.div`
  padding: 10px 20px;

  @media (max-width: ${tablet}) {
    padding: 5px 10px;
  }
`;

// Header styles
export const Header = styled(StandardWrapper)`
  border-top-left-radius: ${stdBR};
  border-top-right-radius: ${stdBR};
  background-color: ${grey5};
  border-bottom: 1px solid ${grey4};
`;

export const Heading = styled.h4`
  color: ${blue1};
  font-size: 1.2rem;
`;

// Main styles
export const Main = styled(StandardWrapper)`
  background-color: ${white1};
`;

export const SecondaryText = styled.p`
  color: ${grey3};
  font-size: 1rem;
  margin-bottom: 10px;
`;

export const PrimaryText = styled(SecondaryText)`
  font-size: 1rem;
  color: ${black};
  text-align: right;
`;

// Footer styles
export const Footer = styled(StandardWrapper)`
  border-bottom-left-radius: ${stdBR};
  border-bottom-right-radius: ${stdBR};
  background-color: ${grey5};
  border-top: 1px solid ${grey4};
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${mobile}) {
    justify-content: center;
  }
`;

export const CustomDurationIconBtn = styled(DurationIconBtn)`
  visibility: visible;
  background-color: ${grey5};
  border-color: ${grey5};
  margin: 0px;

  &:hover,
  &:focus-visible {
    background-color: ${orange1};
    border-color: ${orange1};
    color: ${grey5};
  }
`;
