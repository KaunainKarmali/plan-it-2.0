import styled from "styled-components";
import { Link } from "react-router-dom";
import ProjectCardWrapper from "./styledComponents/ProjectCardWrapper.styles";
import { black, blue1, blue3, white1 } from "../variables/colours";
import { stdBR } from "../variables/borders";

const ProjectCard = (props) => {
  const { project } = props;

  return (
    <ProjectLink
      to={`/tasks/${project._id}`}
      params={{ projectId: project._id }}
    >
      <ProjectCardWrapper>
        <h3>{project.name}</h3>
        <DueDate>{project.dueDate}</DueDate>
      </ProjectCardWrapper>
    </ProjectLink>
  );
};

export default ProjectCard;

const ProjectLink = styled(Link)`
  cursor: pointer;
  border-radius: ${stdBR};
  transition: 0.2s all ease-in-out;
  display: inline-block;
  background-color: ${blue1};
  padding: 10px;
  color: ${white1};
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  font-size: 1rem;
  text-decoration: none;

  &:visited {
    color: ${white1};
  }

  &:hover,
  &:focus-visible {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    color: ${white1};
    background-color: ${blue3};
    color: ${black};
    outline: none;
  }
`;

const DueDate = styled.p`
  font-size: 0.8rem;
`;
