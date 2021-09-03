import { Link } from "react-router-dom";
import { NavAnchor } from "./styledComponents/Anchor.styles";

const NavLink = (props) => {
  const { to, name } = props;

  return (
    <li>
      <Link to={to}>
        {name}
        {/* <NavAnchor href={link}>{name}</NavAnchor> */}
      </Link>
    </li>
  );
};

export default NavLink;
