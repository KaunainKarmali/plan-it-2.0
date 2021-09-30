import styled from "styled-components";
import { getRGBvalue } from "../../utils";
import { black, white1, grey5, grey4, blue1 } from "../../variables/colours";
import { stdBR } from "../../variables/borders";
import { tablet, mobile } from "../../variables/screen";
import { stdSpace } from "../../variables/spacing";

export const ModalBackground = styled.div`
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

export const ModalContainer = styled.div`
  width: auto;
  max-width: 800px;
  max-height: 85vh;
  background-color: ${white1};
  color: ${white1};
  border-radius: ${stdBR};
  padding: 0px;
  position: relative;

  @media (max-width: ${tablet}) {
    width: 90vw;
    max-height: 90vh;
  }

  @media (max-width: ${mobile}) {
    width: 95vw;
  }
`;

export const ModalInner = styled.div`
  padding: 20px 30px;

  @media (max-width: ${tablet}) {
    padding: 20px 20px;
  }
`;

// Header styles
export const ModalHeader = styled(ModalInner)`
  border-top-left-radius: ${stdBR};
  border-top-right-radius: ${stdBR};
  background-color: ${grey5};
  border-bottom: 1px solid ${grey4};
`;

export const Heading = styled.h4`
  color: ${blue1};
  font-size: 1.5rem;
  margin-bottom: ${stdSpace};
`;

// Main styles
export const ModalMain = styled(ModalInner)`
  overflow-y: auto;
  max-height: 55vh;

  /* Whole scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    height: 3px;
    background: ${blue1};
    border-radius: ${stdBR};
  }
`;

// Footer styles
export const ModalFooter = styled(ModalInner)`
  border-bottom-left-radius: ${stdBR};
  border-bottom-right-radius: ${stdBR};
  background-color: ${grey5};
  border-top: 1px solid ${grey4};
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${mobile}) {
    justify-content: center;
  }
`;
