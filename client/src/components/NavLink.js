import { NavAnchor } from "./styledComponents/Anchor.styles";

const NavLink = (props) => {
  const { to, name } = props;

  return (
    <li>
      <NavAnchor to={to}>{name}</NavAnchor>
    </li>
  );
};

export default NavLink;
