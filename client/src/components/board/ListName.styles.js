import styled from "styled-components";
import { red1, black } from "../../variables/colours";
import { smlSpace, stdSpace } from "../../variables/spacing";
import { IconButton } from "../generalStyledComponents/Buttons.styles";

export const ListNameContainer = styled.div`
  display: flex;
  padding: ${stdSpace} 0px;
  margin-bottom: ${stdSpace};
  text-transform: capitalize;
  border-bottom: 3px solid;
  color: ${red1};
  border-bottom-color: ${red1};
`;

export const Name = styled.div`
  flex-grow: 1;
`;

export const AddIconBtn = styled(IconButton)`
  margin-right: ${smlSpace};
  color: ${red1};
  background-color: ${black};
  border: 2px solid ${red1};

  &:hover,
  &:focus-visible {
    background-color: ${red1};
    color: ${black};
  }
`;