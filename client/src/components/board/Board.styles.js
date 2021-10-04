import styled from "styled-components";
import { tabletWidthLrg } from "../../variables/screen";

export const ListsContainer = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  column-gap: 10px;
  overflow-x: auto;
  width: calc(100vw - 230px);

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    row-gap: 10px;
  }

  @media (max-width: ${tabletWidthLrg}) {
    width: 100%;
  }
`;
