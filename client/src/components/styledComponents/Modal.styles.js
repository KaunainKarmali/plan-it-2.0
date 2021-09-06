import styled from "styled-components";
import { getRGBvalue } from "../../utils";
import { black, white1 } from "../../variables/colours";
import { stdBR } from "../../variables/borders";
import { tablet, mobile } from "../../variables/screen";

export const ModalOuter = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(${getRGBvalue(black)}, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

export const ModalInner = styled.div`
  width: 80vw;
  max-width: 800px;
  max-height: 85vh;
  background-color: ${white1};
  color: ${white1};
  border-radius: ${stdBR};
  padding: 30px 50px;
  position: relative;

  @media (max-width: ${tablet}) {
    width: 90vw;
    max-height: 90vh;
  }

  @media (max-width: ${mobile}) {
    padding: 20px 20px;
    width: 95vw;
  }
`;
