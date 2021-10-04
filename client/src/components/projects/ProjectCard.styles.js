import styled from "styled-components";
import { BaseLink } from "../general/Link.styles";
import { blue1, blue3 } from "../../variables/colours";

export const ProjectItem = styled.li`
  display: flex;
  justify-content: stretch;
`;

export const ProjectCardWrapper = styled.div`
  padding: 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProjectLink = styled(BaseLink)`
  display: flex;
  justify-content: stretch;
  text-transform: uppercase;
  width: 100%;
  background-color: ${blue1};
  border-radius: 5px;
  padding: 10px;

  &:hover,
  &:focus-visible {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    background-color: ${blue3};
  }
`;

export const ProjectTitle = styled.h3`
  margin-bottom: 20px;
`;

export const ProjectDueDate = styled.p`
  font-size: 0.8rem;
`;
