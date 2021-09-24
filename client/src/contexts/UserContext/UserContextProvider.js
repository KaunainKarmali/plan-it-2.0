import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/queries";
import { CREATE_USER } from "../../graphql/mutations";
import UserContext from "./UserContext";
import Loading from "../../components/Loading";
import ErrorModal from "../../components/ErrorModal";

const UserContextProvider = (props) => {
  const { fp } = props;
  const [user, setUser] = useState({});

  // Retrieve user from db on render
  const getUser = useQuery(GET_USER, {
    variables: { fp },
  });

  // Create user mutation and get user immediately after user is created
  const [createUserMutation, createUser] = useMutation(CREATE_USER, {
    refetchQueries: [
      {
        query: GET_USER,
        variables: { fp },
      },
    ],
    awaitRefetchQueries: true,
  });

  // Loading and error states
  if (getUser.loading || createUser.loading) return <Loading />;
  if (getUser.error || createUser.error) return <ErrorModal />;

  // Update local state if query returns the user
  if (
    getUser.data.user.__typename === "User" &&
    Object.keys(user).length === 0
  ) {
    setUser({ ...getUser.data.user });
    return <Loading />;
  }

  // Create a new user if query cannot find the user
  if (getUser.data.user.__typename === "UserNotFound") {
    createUserMutation({ variables: { fp: fp } });
    return <Loading />;
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
