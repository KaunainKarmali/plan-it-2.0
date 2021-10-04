import styled from "styled-components";
import { stdBR } from "../../variables/borders";
import {
  green4,
  grey1,
  grey4,
  white1,
  grey2,
  orange1,
  purple1,
  red3,
} from "../../variables/colours";
import { medSpace, smlSpace, stdSpace } from "../../variables/spacing";
import { IconButton } from "../general/Buttons.styles";

export const CardMain = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CloseContainer = styled.div`
  margin-top: -5px;
  margin-right: -5px;
`;

export const Title = styled.h3`
  font-size: 1.3rem;
  color: ${white1};
  margin-bottom: ${medSpace};
  margin-right: 5px;
`;

export const Description = styled.p`
  width: 90%;
  font-size: 1rem;
  color: ${grey4};
  margin-bottom: ${medSpace};
`;

export const TaskCloseIconBtn = styled(IconButton)`
  color: ${red3};
  opacity: 0;
  transition: none;

  &:hover,
  &:focus-visible {
    opacity: 1;
    background-color: ${red3};
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
  opacity: 0;
  transition: none;

  &:hover,
  &:focus-visible {
    opacity: 1;
    background-color: ${orange1};
  }
`;

export const EditIconBtn = styled(IconButton)`
  color: ${purple1};
  transition: none;
  opacity: 0;

  &:hover,
  &:focus-visible {
    opacity: 1;
    background-color: ${purple1};
  }
`;

const Card = styled.div`
  min-height: 50px;
  background-color: ${grey1};
  border-radius: ${stdBR};
  padding: ${stdSpace};

  &:active
    ${TaskCloseIconBtn},
    &:active
    ${DurationIconBtn},
    &:active
    ${EditIconBtn},
    &:hover
    ${TaskCloseIconBtn},
    &:hover
    ${DurationIconBtn},
    &:hover
    ${EditIconBtn},
    &:focus-within
    ${TaskCloseIconBtn},
    &:focus-within
    ${DurationIconBtn},
    &:focus-within
    ${EditIconBtn} {
    opacity: 1;
  }
`;

export default Card;
