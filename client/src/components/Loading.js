import styled from "styled-components";
import { getRGBvalue } from "../utils";
import { black, blue1, green3 } from "../variables/colours";

const Loading = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(${getRGBvalue(black)}, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const Spinner = styled.div`
  height: 100px;
  width: 100px;
  border: 10px solid ${blue1};
  border-top: 10px solid ${green3};
  animation: spin 1s linear infinite;
  border-radius: 50%;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
