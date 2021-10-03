import styled from "styled-components";
import { blue2, orange1 } from "../../variables/colours";

export const FooterAnchor = styled.a`
  width: 100%;
  text-decoration: none;
  transition: 0.2s all ease-in-out;
  color: ${blue2};
  display: inline;
  position: relative;
  font-size: 0.8rem;

  &::before {
    content: "";
    background-color: ${orange1};
    position: absolute;
    height: 2px;
    width: 0%;
    bottom: 0;
    transition: 0.3s all ease-in-out;
  }

  &:hover {
    &::before {
      width: 100%;
    }
  }
`;
