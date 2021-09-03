import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Wrapper from "./components/styledComponents/Wrapper.styles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import TimerContextProvider from "./contexts/TimerContext/TimerContextProvider";
import Main from "./components/Main";
import Projects from "./components/Projects";
import MainWrapper from "./components/styledComponents/MainWrapper.styles";

const App = () => {
  return (
    <div>
      <TimerContextProvider>
        <Router>
          <Wrapper>
            <Header />
            <Nav />
            <MainWrapper>
              <Switch>
                <Route exact path="/">
                  <Main />
                </Route>
                <Route exact path="/projects">
                  <Projects />
                </Route>
              </Switch>
            </MainWrapper>
          </Wrapper>
          <Footer />
        </Router>
      </TimerContextProvider>
    </div>
  );
};

export default App;
