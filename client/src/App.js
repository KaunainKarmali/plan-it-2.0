import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Wrapper from "./components/styledComponents/Wrapper.styles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import TimerContextProvider from "./contexts/TimerContext/TimerContextProvider";
import UserContextProvider from "./contexts/UserContext/UserContextProvider";
import Tasks from "./components/Tasks";
import Projects from "./components/Projects";
import MainWrapper from "./components/styledComponents/MainWrapper.styles";
import ErrorModal from "./components/ErrorModal";

const App = () => {
  // Tracks if an error occurred when trying to fetch or create a user
  const [error, setError] = useState({ error: false, message: "" });

  return (
    <div>
      <UserContextProvider setError={setError}>
        <TimerContextProvider>
          <Router>
            <Wrapper>
              <Header />
              <Nav />
              <MainWrapper>
                <Switch>
                  <Route exact path="/">
                    <Projects />
                  </Route>
                  <Route exact path="/projects">
                    <Projects />
                  </Route>
                  <Route exact path="/tasks/:projectId">
                    <Tasks />
                  </Route>
                </Switch>
              </MainWrapper>
            </Wrapper>
            <Footer />
            {error.error && <ErrorModal error={error} setError={setError} />}
          </Router>
        </TimerContextProvider>
      </UserContextProvider>
    </div>
  );
};

export default App;
