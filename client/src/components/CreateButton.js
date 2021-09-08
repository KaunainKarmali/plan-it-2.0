import styled from "styled-components";
import { black, green1, green3 } from "../variables/colours";
import { PrimaryButton } from "./styledComponents/Buttons.styles";
import ProjectCardWrapper from "./styledComponents/ProjectCardWrapper.styles";

const CreateButton = (props) => {
  const { handleClick, text } = props;

  return (
    <CustomButton onClick={() => handleClick()}>
      <ProjectCardWrapper>
        <h3>{text}</h3>
      </ProjectCardWrapper>
    </CustomButton>
  );
};

export default CreateButton;

const CustomButton = styled(PrimaryButton)`
  background-color: ${green1};
  font-size: 1rem;
  padding: 10px;

  &:hover,
  &:focus-visible {
    background-color: ${green3};
    color: ${black};
  }
`;
