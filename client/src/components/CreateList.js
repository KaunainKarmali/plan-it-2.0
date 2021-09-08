import styled from "styled-components";
import { black, green1, green3 } from "../variables/colours";
import { PrimaryButton } from "./styledComponents/Buttons.styles";
import ProjectCardWrapper from "./styledComponents/ProjectCardWrapper.styles";

const CreateList = (props) => {
  const { handleClick } = props;

  return (
    <Wrapper>
      <CustomButton onClick={() => handleClick()}>
        <ProjectCardWrapper>
          <h3>Create a list</h3>
        </ProjectCardWrapper>
      </CustomButton>
    </Wrapper>
  );
};

export default CreateList;

const Wrapper = styled.li`
  min-width: 300px;
`;

const CustomButton = styled(PrimaryButton)`
  background-color: ${green1};
  font-size: 1rem;
  padding: 10px;
  width: 100%;

  &:hover,
  &:focus-visible {
    background-color: ${green3};
    color: ${black};
  }
`;
