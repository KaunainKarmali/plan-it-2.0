import { NavAnchor } from "../styledComponents/Anchor.styles";

const NavLink = (props) => {
  const { to, name, setToggleNavMenu } = props;

  return (
    <li
      onClick={() => {
        setToggleNavMenu(false);
      }}
    >
      <NavAnchor to={to}>{name}</NavAnchor>
    </li>
  );
};

export default NavLink;
