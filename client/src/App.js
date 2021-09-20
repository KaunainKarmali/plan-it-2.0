import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { uri } from "./settings";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import TimerContextProvider from "./contexts/TimerContext/TimerContextProvider";
import UserContextProvider from "./contexts/UserContext/UserContextProvider";
import LoadingContextProvider from "./contexts/LoadingContext/LoadingContextProvider";
import Routes from "./Routes";
import ErrorModal from "./components/ErrorModal";
import Loading from "./components/Loading";

const App = () => {
  // Connect to Apollo
  const client = new ApolloClient({
    uri: uri,
    cache: new InMemoryCache(),
  });

  const [fp, setFp] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Generate the user's fingerprint
  // Library reference: https://github.com/fingerprintjs/fingerprintjs
  const createFp = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  };

  useEffect(() => {
    createFp()
      .then((result) => setFp(result))
      .catch((error) => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorModal />;

  return (
    <div>
      <ApolloProvider client={client}>
        <LoadingContextProvider>
          <UserContextProvider fp={fp}>
            <TimerContextProvider>
              <Routes />
            </TimerContextProvider>
          </UserContextProvider>
        </LoadingContextProvider>
      </ApolloProvider>
    </div>
  );
};

export default App;
