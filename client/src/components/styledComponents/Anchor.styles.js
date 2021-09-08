import styled from "styled-components";
import { Link } from "react-router-dom";
import { black, blue2, grey2, orange1, white2 } from "../../variables/colours";
import { stdSpace } from "../../variables/spacing";

const Anchor = styled(Link)`
  font-size: 1rem;
  width: 100%;
  display: inline-block;
  text-decoration: none;
  color: ${black};
  transition: 0.2s all ease-in-out;
`;

export const NavAnchor = styled(Anchor)`
  color: ${white2};
  padding: ${stdSpace};
  border-radius: 3px;

  &:hover {
    background-color: ${grey2};
  }
`;

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

export default Anchor;
