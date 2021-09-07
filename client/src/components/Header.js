import styled from "styled-components";
import Logo from "./Logo";
import { tabletWidthLrg } from "../variables/screen";
import { IconButton } from "./styledComponents/Buttons.styles";
import { black, blue3 } from "../variables/colours";

const Header = (props) => {
  const { toggleNavMenu, setToggleNavMenu } = props;

  return (
    <HeaderWrapper>
      <Logo />
      <NavToggle
        onClick={() => setToggleNavMenu(!toggleNavMenu)}
        toggleNavMenu={toggleNavMenu}
      >
        <i className="fas fa-bars" />
        <span className="sr-only">Nav menu toggle</span>
      </NavToggle>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
`;

const NavToggle = styled(IconButton)`
  color: ${blue3};
  display: none;
  padding: 10px;
  margin: 5px 10px;
  background-color: ${black};

  &:hover,
  &:focus-visible {
    color: ${black};
    background-color: ${blue3};
  }

  @media (max-width: ${tabletWidthLrg}) {
    display: block;
  }
`;

export default Header;
