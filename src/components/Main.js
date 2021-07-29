import React, { useEffect, useState } from "react";
import firebase from "firebase";
import styled from "styled-components";
import { white2 } from "../variables/colours";
import List from "./List";
import Search from "./Search";
import { footerHeight, headerHeight, searchHeight } from "../variables/heights";
import { stdSpace } from "../variables/spacing";
import TimerContext from "../contexts/TimerContext";
import Timer from "./Timer";
import CounterIdContext from "../contexts/CounterIdContext";

const Main = () => {
  const lists = ["to do", "doing", "done"];
  const [tasksByList, setTasksByList] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref("/tasks");
    dbRef.on("value", (response) => {
      const data = response.val();

      const tempTasksByList = {};

      // Organize the data retrieved into an object with each property being a list of tasks
      for (const key in data) {
        const list = data[key].list;
        const taskObj = { key: key, value: data[key] };

        if (list in tempTasksByList) {
          tempTasksByList[list].push(taskObj);
        } else {
          tempTasksByList[list] = [taskObj];
        }
      }

      setTasksByList(tempTasksByList);
    });
  }, []);

  const [isCounting, setIsCounting] = useState(false);
  const [counterId, setCounterId] = useState("");

  return (
    <TimerContext.Provider value={[isCounting, setIsCounting]}>
      <CounterIdContext.Provider value={[counterId, setCounterId]}>
        <MainWrapper>
          <SearchWrapper>
            <Search />
          </SearchWrapper>
          <ListsWrapper>
            <Lists>
              {lists.map((list, index) => (
                <List key={index} list={list} tasks={tasksByList[list]} />
              ))}
            </Lists>
          </ListsWrapper>
          {isCounting && <Timer />}
        </MainWrapper>
      </CounterIdContext.Provider>
    </TimerContext.Provider>
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
