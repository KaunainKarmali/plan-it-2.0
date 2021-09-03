import styled from "styled-components";
import { black, blue3, blue4 } from "../variables/colours";
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
        <Wrapper>
          <h3>Create a project</h3>
        </Wrapper>
      </ProjectCardWrapper>
    </CreateButton>
  );
};

export default CreateProjectButton;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
`;

const CreateButton = styled(PrimaryButton)`
  background-color: ${blue4};

  &:hover,
  &:focus-visible {
    background-color: ${blue3};
    color: ${black};
  }
`;
