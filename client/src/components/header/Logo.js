import styled from "styled-components";
import { blue2 } from "../../variables/colours";
import { stdSpace } from "../../variables/spacing";

const Logo = () => {
  return <Name>planIt</Name>;
};

const Name = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  padding: ${stdSpace};
  color: ${blue2};
`;

export default Logo;
