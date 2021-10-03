import { ModalBackground } from "./generalStyledComponents/Modal.styles";
import { Spinner } from "./Loading.styles";

const Loading = () => {
  return (
    <ModalBackground>
      <Spinner />
    </ModalBackground>
  );
};

export default Loading;
