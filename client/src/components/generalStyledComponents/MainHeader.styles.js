import styled from "styled-components";
import { blue3 } from "../../variables/colours";
import { mobile } from "../../variables/screen";

export const MainHeaderContainer = styled.div`
  padding-bottom: 10px;
  border-bottom: 2px solid ${blue3};
  margin-bottom: 20px;
  color: ${blue3};
  display: flex;
  justify-content: space-between;
`;

export const MainHeaderTitle = styled.h2`
  font-size: 2rem;

  @media (max-width: ${mobile}) {
    font-size: 1.5rem;
  }
`;
