import styled from "styled-components";
import { black, grey2 } from "../../variables/colours";
import { tabletWidthLrg } from "../../variables/widths";
import { mobile } from "../../variables/screen";

export const ListItem = styled.li`
  background-color: ${black};
  border-radius: 5px;
  padding: 10px;
  border: 2px solid ${grey2};
  min-width: 300px;

  @media (max-width: ${mobile}) {
    min-width: 95%;
  }
`;

export const TasksContainer = styled.div`
  overflow: auto;
  height: calc(100vh - 275px);

  @media (max-width: ${tabletWidthLrg}) {
    max-height: 50vh;
    height: auto;
  }
`;

export const TasksList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 5px;
`;
