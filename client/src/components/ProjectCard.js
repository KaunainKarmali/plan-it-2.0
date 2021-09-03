import styled from "styled-components";
import { Link } from "react-router-dom";
import { PrimaryButton } from "./styledComponents/Buttons.styles";
import ProjectCardWrapper from "./styledComponents/ProjectCardWrapper.styles";
import { black, blue3, blue4 } from "../variables/colours";

// TODO: FIX THIS CARD!!!
const ProjectCard = (props) => {
  const { project } = props;

  return (
    <Link to="/projects">
      <Wrapper>
        <ProjectCardWrapper>
          <h3>{project.name}</h3>
          <p>{project.dueDate}</p>
        </ProjectCardWrapper>
      </Wrapper>
    </Link>
  );
};

export default ProjectCard;

const Wrapper = styled(PrimaryButton)`
  background-color: ${blue4};

  &:hover,
  &:focus-visible {
    background-color: ${blue3};
    color: ${black};
  }
`;
