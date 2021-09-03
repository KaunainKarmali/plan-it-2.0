import styled from "styled-components";
import { stdBR } from "../variables/borders";
import { black, grey1 } from "../variables/colours";
import { smlSpace, stdSpace } from "../variables/spacing";
import { navWidth } from "../variables/widths";
import NavLink from "./NavLink";
import { tabletWidthLrg } from "../variables/widths";

const Nav = () => {
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
    <NavWrapper>
      <ul>
        {navLinks.map((navItem, index) => (
          <NavLink key={index} name={navItem.name} to={navItem.to} />
        ))}
      </ul>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  grid-area: nav;
  width: ${navWidth};
  top: 0;
  bottom: 0;
  right: 0;
  padding: ${stdSpace} ${smlSpace};
  background-color: ${grey1};
  border-left: 2px solid ${black};
  border-top: 2px solid ${black};
  border-bottom: 2px solid ${black};
  border-top-left-radius: ${stdBR};
  border-bottom-left-radius: ${stdBR};

  @media (max-width: ${tabletWidthLrg}) {
    display: none;
  }
`;

export default Nav;
