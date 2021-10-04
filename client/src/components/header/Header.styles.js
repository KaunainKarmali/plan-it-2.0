import styled from "styled-components";
import { tabletWidthLrg } from "../../variables/screen";
import { IconButton } from "../general/Buttons.styles";
import { black, blue3 } from "../../variables/colours";

export const HeaderWrapper = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
`;

export const NavToggle = styled(IconButton)`
  color: ${blue3};
  display: none;
  padding: 10px;
  margin: 5px 10px;
  background-color: ${black};

  &:hover,
  &:focus-visible {
    color: ${black};
    background-color: ${blue3};
  }

  @media (max-width: ${tabletWidthLrg}) {
    display: block;
  }
`;
