import styled from "styled-components/macro";
import { tablet } from "../../variables/screen";

export const DropdownContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  column-gap: 20px;
  justify-content: space-between;

  @media (max-width: ${tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: 2fr;
  }
`;
