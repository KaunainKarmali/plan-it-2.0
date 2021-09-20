import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries";
import { CREATE_USER } from "../../graphql/mutations";
import UserContext from "./UserContext";
import Loading from "../../components/Loading";
import ErrorModal from "../../components/ErrorModal";

const UserContextProvider = (props) => {
  const { fp } = props;
  const [create, setCreate] = useState(false);
  const [user, setUser] = useState({});

  const {
    loading: readLoading,
    error: readError,
    data: readData,
  } = useQuery(GET_USER, {
    variables: { fp },
    onError: (error) => setCreate(true),
    skip: create,
  });

  const {
    loading: createLoading,
    error: createError,
    data: createData,
  } = useQuery(CREATE_USER, {
    variables: { fp },
    skip: !create,
    refetch: create,
  });

  useEffect(() => readData && setUser(readData.user), [readData]);
  useEffect(() => createData && setUser(createData.user), [createData]);

  if (readLoading || createLoading) return <Loading />;
  if (readError || createError) return <ErrorModal />;

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
