import styled from "styled-components";
import { tablet, mobile } from "../../variables/screen";

export const ProjectsListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 10px;
  column-gap: 10px;

  @media (max-width: ${tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${mobile}) {
    grid-template-columns: 1fr;
  } ;
`;
