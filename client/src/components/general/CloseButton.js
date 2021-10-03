import { CloseIcon } from "../general/Buttons.styles";

const CloseButton = (props) => {
  const { cb } = props;

  const handleClose = (e) => {
    e.preventDefault();
    cb && cb();
  };

  return (
    <CloseIcon onClick={handleClose}>
      <i className="fas fa-times"></i>
      <span className="sr-only">Close modal</span>
    </CloseIcon>
  );
};

export default CloseButton;
