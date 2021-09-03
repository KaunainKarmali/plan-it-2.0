import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase";
import styled from "styled-components";
import { white2 } from "../variables/colours";
import List from "./List";
import { stdSpace } from "../variables/spacing";
import TimerContext from "../contexts/TimerContext/TimerContext";
import Timer from "./Timer";

const Tasks = () => {
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

  // State to track when timer is turned on or off
  const [timer] = useContext(TimerContext);

  return (
    <MainWrapper>
      <ListsWrapper>
        <Lists>
          {lists.map((list, index) => (
            <List key={index} list={list} tasks={tasksByList[list]} />
          ))}
        </Lists>
      </ListsWrapper>
      {timer.on && <Timer />}
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  grid-area: main;
  color: ${white2};
  padding: ${stdSpace};
`;

const ListsWrapper = styled.section`
  display: grid;
`;

const Lists = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;

  @media (max-width: 1000px) {
    grid-template-rows: repeat(3, auto);
    grid-template-columns: 1fr;
    row-gap: 10px;
  }
`;

export default Tasks;
