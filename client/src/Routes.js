import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Wrapper from "./components/styledComponents/Wrapper.styles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Board from "./components/Board";
import Projects from "./components/Projects";
import MainWrapper from "./components/styledComponents/MainWrapper.styles";
import Dashboard from "./components/Dashboard";

const Routes = () => {
  const [toggleNavMenu, setToggleNavMenu] = useState(false);

  return (
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
    </Router>
  );
};

export default Routes;
