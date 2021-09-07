import { NavAnchor } from "./styledComponents/Anchor.styles";

const NavLink = (props) => {
  const { to, name, setToggleNavMenu, toggleNavMenu } = props;

  return (
    <li
      onClick={() => {
        console.log(toggleNavMenu);
        setToggleNavMenu(false);
      }}
    >
      <NavAnchor to={to}>{name}</NavAnchor>
    </li>
  );
};

export default NavLink;
