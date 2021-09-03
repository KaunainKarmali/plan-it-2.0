import styled from "styled-components";
import { black, green1, green3 } from "../variables/colours";
import { PrimaryButton } from "./styledComponents/Buttons.styles";
import ProjectCardWrapper from "./styledComponents/ProjectCardWrapper.styles";

const CreateProjectButton = (props) => {
  const { setCreateProject } = props;

  const handleClick = () => {
    setCreateProject(true);
  };

  return (
    <CreateButton onClick={handleClick}>
      <ProjectCardWrapper>
        <h3>Create a project</h3>
      </ProjectCardWrapper>
    </CreateButton>
  );
};

export default CreateProjectButton;

const CreateButton = styled(PrimaryButton)`
  background-color: ${green1};
  font-size: 1rem;
  padding: 10px;
  margin: 0px 10px 10px 0px;

  &:hover,
  &:focus-visible {
    background-color: ${green3};
    color: ${black};
  }
`;
