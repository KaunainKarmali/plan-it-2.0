import styled from "styled-components";
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
`;

export default Header;
