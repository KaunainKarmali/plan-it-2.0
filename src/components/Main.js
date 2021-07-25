import styled from "styled-components";
import { white2 } from "../variables/colours";
import List from "./List";
import Search from "./Search";
import { footerHeight, headerHeight, searchHeight } from "../variables/heights";
import { stdSpace } from "../variables/spacing";

const Main = () => {
  const lists = ["to do", "doing", "done"];

  return (
    <MainWrapper>
      <SearchWrapper>
        <Search />
      </SearchWrapper>
      <ListsWrapper>
        <Lists>
          {lists.map((list, index) => (
            <List key={index} list={list} />
          ))}
        </Lists>
      </ListsWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  grid-area: main;
  color: ${white2};
  display: grid;
  grid-template-rows: ${searchHeight} auto;
  grid-template-columns: 1fr;
  grid-template-areas: "search" "lists";
  row-gap: 10px;
  padding: ${stdSpace};
`;

const SearchWrapper = styled.section`
  grid-area: search;
`;

const ListsWrapper = styled.section`
  grid-area: lists;
  display: grid;
`;

const Lists = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  max-height: calc(
    100vh - ${searchHeight} - ${footerHeight} - ${headerHeight} - 30px
  );
`;

export default Main;
