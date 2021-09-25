import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LISTS } from "../../graphql/queries";
import { CREATE_LIST } from "../../graphql/mutations";
import styled from "styled-components";
import List from "./List";
import TimerContext from "../../contexts/TimerContext/index.js";
import Timer from "./Timer";
import CreateListForm from "../CreateListForm";
import { serverUrl } from "../../settings";
import ErrorModal from "../ErrorModal";
import { black, blue3, green1, green3 } from "../../variables/colours";
import { PrimaryButton } from "../styledComponents/Buttons.styles";
import { mobile, tabletWidthLrg } from "../../variables/screen";
import LoadingContext from "../../contexts/LoadingContext/index.js";
import Loading from "../Loading";

const Board = () => {
  // Extract project id associated with the board
  const { projectId } = useParams();

  // Tracks when the user clicks on the button to create a new custom list
  const [openCreateListForm, setOpenCreateListForm] = useState(false);

  // State to track when timer is turned on or off
  const [timer] = useContext(TimerContext);

  // Get lists using project id
  const getLists = useQuery(GET_LISTS, {
    variables: { projectId },
  });

  // Create new ;ost in db
  const [createListMutation, createList] = useMutation(CREATE_LIST, {
    refetchQueries: [
      {
        query: GET_LISTS,
        variables: { projectId },
      },
    ],
    awaitRefetchQueries: true,
  });

  // Loading and error states
  if (getLists.error || createList.error) return <ErrorModal />;
  if (getLists.loading || createList.loading) return <Loading />;

  // Toggle form to create a new list
  if (openCreateListForm)
    return (
      <CreateListForm
        setOpenCreateListForm={setOpenCreateListForm}
        createList={(listName) => {
          const data = { listInput: { name: listName, projectId: projectId } };
          createListMutation({ variables: data });
        }}
      />
    );

  const { lists } = getLists.data;

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
          {lists.__typename === "Lists" &&
            lists.lists.map((list) => (
              <List
                key={list._id}
                list={list}
                // setToggleTaskCreated={setToggleTaskCreated}
                // toggleTaskCreated={toggleTaskCreated}
              />
            ))}
        </Wrapper>
      </Container>
      {timer.on && <Timer />}
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
