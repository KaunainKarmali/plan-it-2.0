import styled from "styled-components";
import { blue1, green3 } from "../../variables/colours";

export const Spinner = styled.div`
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
