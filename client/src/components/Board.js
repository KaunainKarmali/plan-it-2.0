import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import List from "./List";
import TimerContext from "../contexts/TimerContext/TimerContext";
import Timer from "./Timer";
import CreateListForm from "./CreateListForm";
import { serverUrl } from "../settings";
import ErrorModal from "./ErrorModal";
import { black, blue3, green1, green3 } from "../variables/colours";
import { PrimaryButton } from "./styledComponents/Buttons.styles";
import { mobile, tabletWidthLrg } from "../variables/screen";
import LoadingContext from "../contexts/LoadingContext";
import Loading from "./Loading";

const Board = () => {
  // Tracks if an error occurred during the fetch and displays message to the user
  const [error, setError] = useState({ error: false, message: "" });

  // Retrieve the project id that the tasks are associated with
  const { projectId } = useParams();

  // Tracks when the user clicks on the button to create a new custom list
  const [openCreateListForm, setOpenCreateListForm] = useState(false);

  // Tracks and saves list details
  const [lists, setLists] = useState([]);

  // Tracks when list has been created and triggers useEffect to pull latest lists
  const [toggleListCreated, setToggleListCreated] = useState(false);

  // Tracks whether a tasks has been created or not and triggers useEffect to pull latest lists and tasks beneath it
  const [toggleTaskCreated, setToggleTaskCreated] = useState(false);

  // State to track when timer is turned on or off
  const [timer] = useContext(TimerContext);

  // Tracks if the timer is loading or not
  const [isLoading] = useContext(LoadingContext);

  // Tracks the names of all the lists that the
  useEffect(() => {
    if (projectId !== undefined) {
      const url = new URL(`${serverUrl}/list/get-lists`);
      const params = { projectId: projectId };
      url.search = new URLSearchParams(params).toString();

      fetch(url)
        .then((res) => {
          // Check if response was successful
          if (res.ok) {
            // If projects were found, 200 status is returned
            if (res.status === 200) {
              return res.json();
            }

            // If request was successful, but project cannot be found, return false to indicate that no project was found
            else {
              throw new Error(res.status);
            }
          }

          // Throw error if errors are found
          else {
            throw new Error(res.status);
          }
        })
        .then((res) => {
          // Save lists found
          setLists(res);
        })
        .catch((error) => {
          // If errors are found, generate an error message and update error state to display error to user
          const status = parseInt(error.message);
          let message = "";

          if (status === 500) {
            message = "Lists cannot be found. Please try again later.";
          } else if (status === 400) {
            message =
              "Project ID was not provided. Please contact the database administrator.";
          } else {
            message = "An error occurred while retrieving your lists.";
          }

          setError({ error: true, message: message });
        });
    }
  }, [projectId, setError, toggleListCreated]);

  // Create a new list in the database
  const createList = (listName) => {
    const url = `${serverUrl}/list/create-list`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: { listName: listName },
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
      .then((res) => {
        setToggleListCreated(!toggleListCreated);
      })
      .catch((error) => {
        // If errors are found, generate an error message and update error state to display error to user
        const status = parseInt(error.message);
        let message = "";

        if (status === 400) {
          message =
            "Incomplete data provided in the request. Please contact the database administrator.";
        } else if (status === 500) {
          message = "Project cannot be found. Please try again later.";
        } else if (status === 400) {
          message =
            "Project cannot be created. Please contact the database administrator.";
        } else {
          message = "An error occurred. List cannot be created.";
        }

        setToggleListCreated(!toggleListCreated);
        setError({ error: true, message: message });
      });
  };

  return (
    <div>
      <HeaderContainer>
        <Header>Your board</Header>
        <CreateButton onClick={() => setOpenCreateListForm(true)}>
          New list
        </CreateButton>
      </HeaderContainer>
      <Container>
        <Wrapper>
          {lists &&
            lists.length > 0 &&
            lists.map((list) => (
              <List
                key={list._id}
                list={list}
                setToggleTaskCreated={setToggleTaskCreated}
                toggleTaskCreated={toggleTaskCreated}
              />
            ))}
        </Wrapper>
      </Container>
      {openCreateListForm && (
        <CreateListForm
          setOpenCreateListForm={setOpenCreateListForm}
          createList={createList}
        />
      )}
      {error.error && <ErrorModal error={error} setError={setError} />}
      {timer.on && <Timer />}
      {isLoading && <Loading />}
    </div>
  );
};

export default Board;

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

  @media (max-width: ${tabletWidthLrg}) {
    width: 100%;
  }
`;

const Container = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 47px - 64px - 35px - 35px);
  border-radius: 5px;
`;

const Header = styled.h2`
  font-size: 2rem;

  @media (max-width: ${mobile}) {
    font-size: 1.5rem;
  }
`;

const HeaderContainer = styled.div`
  padding-bottom: 10px;
  border-bottom: 2px solid ${blue3};
  margin-bottom: 20px;
  color: ${blue3};
  display: flex;
  justify-content: space-between;
`;

const CreateButton = styled(PrimaryButton)`
  background-color: ${green1};
  font-size: 1rem;
  padding: 10px;
  font-weight: 700;

  &:hover,
  &:focus-visible {
    background-color: ${green3};
    color: ${black};
  }

  @media (max-width: ${mobile}) {
    font-size: 0.9rem;
    padding: 8px 10px;
  }
`;
