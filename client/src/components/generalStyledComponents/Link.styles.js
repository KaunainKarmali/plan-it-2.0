import styled from "styled-components";
import { Link } from "react-router-dom";
import { black, white1 } from "../../variables/colours";

export const BaseLink = styled(Link)`
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  display: inline-block;
  letter-spacing: 1px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  font-size: 1rem;
  text-decoration: none;
  color: ${white1};

  &:visited {
    color: ${white1};
  }

  &:hover,
  &:focus-visible {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    color: ${black};
    outline: none;
  }
`;
