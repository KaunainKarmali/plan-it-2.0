import styled from "styled-components";
import { black } from "../variables/colours";
import { footerHeight } from "../variables/heights";
import { navWidth } from "../variables/widths";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr ${navWidth};
  grid-template-rows: auto 1fr;
  grid-template-areas: "header nav" "main nav";
  min-height: calc(100vh - ${footerHeight});
  background: ${black};
`;

export default Wrapper;
