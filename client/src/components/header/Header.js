import Logo from "./Logo";
import { HeaderWrapper, NavToggle } from "./Header.styles";

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

export default Header;
