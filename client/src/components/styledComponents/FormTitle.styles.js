import styled from "styled-components/macro";
import { blue1 } from "../../variables/colours";
import { mobile } from "../../variables/screen";
import { stdSpace } from "../../variables/spacing";

const FormTitle = styled.h3`
  font-size: 2rem;
  color: ${blue1};
  margin-bottom: ${stdSpace};

  @media (max-width: ${mobile}) {
    font-size: 1.5rem;
  }
`;

export default FormTitle;
