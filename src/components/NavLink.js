import { NavAnchor } from "./Anchor";

const NavLink = (props) => {
  const { link, name } = props;

  return (
    <>
      <li>
        <NavAnchor href={link}>{name}</NavAnchor>
      </li>
    </>
  );
};

export default NavLink;
