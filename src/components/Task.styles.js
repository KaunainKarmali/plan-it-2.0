import styled, { css } from "styled-components/macro";
import { stdBR } from "../variables/borders";
import {
  blue3,
  green3 as green4,
  grey1,
  grey4,
  white1,
  grey2,
  orange1,
  purple1,
} from "../variables/colours";
import { medSpace, smlSpace, stdSpace } from "../variables/spacing";
import { IconButton } from "./Buttons";

export const Title = styled.h3`
  font-size: 1.3rem;
  color: ${white1};
  margin-bottom: ${medSpace};
`;

export const Description = styled.p`
  width: 90%;
  font-size: 1rem;
  color: ${grey4};
  margin-bottom: ${medSpace};
`;

export const CloseIconBtn = styled(IconButton)`
  color: ${blue3};
  font-size: 0.9rem;
  position: absolute;
  margin: ${smlSpace};
  top: 0px;
  right: ${smlSpace};
  visibility: hidden;
  transition: none;

  &:hover,
  &:focus {
    background-color: ${blue3};
  }
`;

export const CardFooter = styled.div`
  border-top: 2px solid ${grey2};
  padding-top: ${smlSpace};
  display: flex;
  justify-content: space-between;
`;

export const DateContainer = styled.div`
  color: ${green4};
  display: flex;
  align-items: center;
`;

export const DateIconBtn = styled(IconButton)`
  color: ${green4};
  transition: none;

  &:hover,
  &:focus {
    background-color: ${green4};
  }
`;

export const DueDate = styled.p`
  margin-left: ${smlSpace};
  font-size: 0.8rem;
`;

export const Options = styled.div`
  display: flex;
`;

export const DurationIconBtn = styled(IconButton)`
  margin-right: ${stdSpace};
  color: ${orange1};
  visibility: hidden;
  transition: none;

  &:hover,
  &:focus {
    background-color: ${orange1};
  }
`;

export const EditIconBtn = styled(IconButton)`
  color: ${purple1};
  visibility: hidden;
  transition: none;

  &:hover,
  &:focus {
    background-color: ${purple1};
  }
`;

const Card = styled.div`
  min-height: 50px;
  background-color: ${grey1};
  border-radius: ${stdBR};
  position: relative;
  padding: ${stdSpace};

  &:active
    ${CloseIconBtn},
    &:active
    ${DurationIconBtn},
    &:active
    ${EditIconBtn},
    &:hover
    ${CloseIconBtn},
    &:hover
    ${DurationIconBtn},
    &:hover
    ${EditIconBtn},
    &:focus-within
    ${CloseIconBtn},
    &:focus-within
    ${DurationIconBtn},
    &:focus-within
    ${EditIconBtn} {
    visibility: visible;
  }
`;

export default Card;
