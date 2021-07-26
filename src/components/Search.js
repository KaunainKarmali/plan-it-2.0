import styled from "styled-components";
import { stdBR } from "../variables/borders";
import { grey1, white1, blue3, blue2, grey4 } from "../variables/colours";
import { smlSpace, stdSpace } from "../variables/spacing";
import { IconButton } from "./Buttons";

const Search = () => {
  return (
    <Wrapper>
      <form action="/" method="GET">
        <SearchBar>
          <label className="sr-only">Search board</label>
          <SearchInput type="text" placeholder="Search board..." />
          <SearchIconBtn>
            <i className="fas fa-search"></i>
          </SearchIconBtn>
        </SearchBar>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-block;
`;

const SearchIconBtn = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  color: ${grey4};
  margin: ${smlSpace};

  &:hover,
  &:focus {
    color: ${blue2};
  }
`;

const SearchInput = styled.input`
  background-color: ${grey1};
  padding: ${stdSpace};
  border: none;
  border-radius: 30px;
  border: 2px solid ${grey1};
  transition: 0.2s all linear;
  margin-left: ${smlSpace};
  color: ${white1};

  &::placeholder {
    color: ${grey4};
  }

  &:focus,
  &:hover {
    outline: none;
    border-color: ${blue2};

    & + ${SearchIconBtn} {
      color: ${blue2};
    }
  }
`;

const SearchBar = styled.div`
  position: relative;
`;

export default Search;
