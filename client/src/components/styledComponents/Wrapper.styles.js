import styled from "styled-components";
import { black, white1 } from "../../variables/colours";
import { footerHeight } from "../../variables/heights";
import { navWidth } from "../../variables/widths";
import { tabletWidthLrg } from "../../variables/widths";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr ${navWidth};
  grid-template-rows: auto 1fr;
  grid-template-areas: "header nav" "main nav";
  min-height: calc(100vh - ${footerHeight});
  background: ${black};
  color: ${white1};

  @media (max-width: ${tabletWidthLrg}) {
    grid-template-rows: auto;
    grid-template-areas: "header header" "main main";
  }
`;

export default Wrapper;
