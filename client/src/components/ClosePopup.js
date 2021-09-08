import styled from "styled-components/macro";
import { CloseIconBtn } from "./styledComponents/Buttons.styles";
import { blue1, white1 } from "../variables/colours";
import { mobile } from "../variables/screen";

const ClosePopup = (props) => {
  const { handleClose } = props;

  return (
    <CloseIcon onClick={handleClose}>
      <i className="fas fa-times"></i>
      <span className="sr-only">Close popup</span>
    </CloseIcon>
  );
};

export default ClosePopup;

const CloseIcon = styled(CloseIconBtn)`
  background-color: transparent;
  color: ${blue1};
  position: absolute;
  margin: 30px 50px;

  top: 0;
  right: 0;

  &:hover,
  &:focus {
    color: ${white1};
    background-color: ${blue1};
  }

  @media (max-width: ${mobile}) {
    margin: 20px 30px;
  }
`;
