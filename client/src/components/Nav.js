import styled, { css } from "styled-components/macro";
import { stdBR } from "../variables/borders";
import { black, grey1 } from "../variables/colours";
import { smlSpace, stdSpace } from "../variables/spacing";
import { navWidth } from "../variables/widths";
import NavLink from "./NavLink";
import { tabletWidthLrg } from "../variables/screen";
import { getRGBvalue } from "../utils";

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

const NavWrapper = styled.nav`
  grid-area: nav;
  width: ${navWidth};
  padding: ${stdSpace} ${smlSpace};
  background-color: ${grey1};
  border-left: 2px solid ${black};
  border-top: 2px solid ${black};
  border-bottom: 2px solid ${black};
  border-top-left-radius: ${stdBR};
  border-bottom-left-radius: ${stdBR};
  transition: 0.3s all ease-in-out;

  @media (max-width: ${tabletWidthLrg}) {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 75%;
    max-width: 300px;
    z-index: 1000;

    ${({ toggleNavMenu }) =>
      toggleNavMenu === false
        ? css`
            margin-right: -300px;
          `
        : css`
            margin-right: 0px;
            &::before {
              content: "";
              position: fixed;
              top: 0;
              bottom: 0;
              right: 0;
              left: 0;
              background-color: rgba(${getRGBvalue(black)}, 0.7);
              z-index: -10;
            }
          `}
  }
`;

export default Nav;
