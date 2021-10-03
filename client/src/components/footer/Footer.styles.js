import styled from "styled-components";
import { grey1, white2 } from "../../variables/colours";
import { footerHeight } from "../../variables/heights";
import { stdSpace } from "../../variables/spacing";

export const FooterWrapper = styled.div`
  font-size: 0.8rem;
  line-height: 0.8rem;
  height: ${footerHeight};
  margin: 0;
  padding: ${stdSpace};
  text-align: center;
  background-color: ${grey1};
  color: ${white2};
`;
