import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";
import List from "./List";
import UserContext from "../contexts/UserContext";
import TimerContext from "../contexts/TimerContext/TimerContext";
import Timer from "./Timer";
import CreateList from "./CreateList";
import MainHeader from "./MainHeader";
import CreateListForm from "./CreateListForm";
import { serverUrl } from "../settings";

const Tasks = () => {
  // Retrieve the project id that the tasks are associated with
  const { projectId } = useParams();

  const [user, setUser] = useContext(UserContext);

  // Tracks when the user clicks on the button to create a new custom list
  const [openCreateListForm, setOpenCreateListForm] = useState(false);

  const lists = ["to do", "doing", "done"];
  const [tasksByList, setTasksByList] = useState([]);

  // State to track when timer is turned on or off
  const [timer] = useContext(TimerContext);

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

  const createList = (listName) => {
    const url = `${serverUrl}/list/create-list`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: listName,
        fp: user.fp,
        projectId: projectId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((res) => console.log(res))
      .catch((error) => {
        // If errors are found, generate an error message and update error state to display error to user
        // const status = parseInt(error.message);
        // let message = "";
        // if (status === 400) {
        //   message =
        //     "Incomplete data provided in the request. Please contact the database administrator.";
        // } else if (status === 500) {
        //   message = "User cannot be found. Please try again later.";
        // } else if (status === 400) {
        //   message =
        //     "Project cannot be created. Please contact the database administrator.";
        // } else {
        //   message = "An error occurred. Project cannot be created.";
        // }
        // setError({ error: true, message: message });
      });
  };

  return (
    <div>
      <MainHeader heading="Your tasks" />
      <Container>
        <Wrapper>
          {lists &&
            lists.map((list, index) => (
              <List key={index} list={list} tasks={tasksByList[list]} />
            ))}
          <CreateList handleClick={() => setOpenCreateListForm(true)} />
          {timer.on && <Timer />}
        </Wrapper>
      </Container>
      {openCreateListForm && (
        <CreateListForm
          setOpenCreateListForm={setOpenCreateListForm}
          createList={createList}
        />
      )}
    </div>
  );
};

export default Tasks;

const Wrapper = styled.ul`
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
`;

const Container = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 47px - 64px - 35px - 23px);
  border-radius: 5px;
`;
