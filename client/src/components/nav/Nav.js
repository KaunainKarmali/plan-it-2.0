import { NavWrapper } from "./Nav.styles";
import NavLink from "./NavLink";

const Nav = (props) => {
  const { toggleNavMenu, setToggleNavMenu } = props;

  const navLinks = [
    {
      name: "Dashboard",
      to: "/dashboard",
    },
    {
      name: "Projects",
      to: "/projects",
    },
  ];

  return (
    <NavWrapper toggleNavMenu={toggleNavMenu}>
      <ul>
        {navLinks.map((navItem, index) => (
          <NavLink
            key={index}
            name={navItem.name}
            to={navItem.to}
            setToggleNavMenu={setToggleNavMenu}
            toggleNavMenu={toggleNavMenu}
          />
        ))}
      </ul>
    </NavWrapper>
  );
};

export default Nav;
