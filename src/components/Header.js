import styled from "styled-components";
import { headerHeight } from "../variables/heights";
import Logo from "./Logo";

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  grid-area: header;
  height: ${headerHeight};
`;

export default Header;
