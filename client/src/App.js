import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Wrapper from "./components/styledComponents/Wrapper.styles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import TimerContextProvider from "./contexts/TimerContext/TimerContextProvider";
import UserContextProvider from "./contexts/UserContext/UserContextProvider";
import LoadingContextProvider from "./contexts/LoadingContext/LoadingContextProvider";
import Board from "./components/Board";
import Projects from "./components/Projects";
import MainWrapper from "./components/styledComponents/MainWrapper.styles";
import ErrorModal from "./components/ErrorModal";
import Dashboard from "./components/Dashboard";

const App = () => {
  // Tracks if an error occurred when trying to fetch or create a user
  const [error, setError] = useState({ error: false, message: "" });

  const [toggleNavMenu, setToggleNavMenu] = useState(false);

  return (
    <div>
      <LoadingContextProvider>
        <UserContextProvider setError={setError}>
          <TimerContextProvider>
            <Router>
              <Wrapper>
                <Header
                  toggleNavMenu={toggleNavMenu}
                  setToggleNavMenu={setToggleNavMenu}
                />
                <Nav
                  toggleNavMenu={toggleNavMenu}
                  setToggleNavMenu={setToggleNavMenu}
                />
                <MainWrapper>
                  <Switch>
                    <Route exact path="/">
                      <Projects />
                    </Route>
                    <Route exact path="/dashboard">
                      <Dashboard />
                    </Route>
                    <Route exact path="/projects">
                      <Projects />
                    </Route>
                    <Route exact path="/tasks/:projectId">
                      <Board />
                    </Route>
                  </Switch>
                </MainWrapper>
              </Wrapper>
              <Footer />
              {error.error && <ErrorModal error={error} setError={setError} />}
            </Router>
          </TimerContextProvider>
        </UserContextProvider>
      </LoadingContextProvider>
    </div>
  );
};

export default App;
