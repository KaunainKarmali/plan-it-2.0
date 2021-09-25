import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Wrapper from "./components/styledComponents/Wrapper.styles";
import Header from "./components/header/index.js";
import Footer from "./components/footer/index.js";
import Nav from "./components/nav/index.js";
import Board from "./components/board/index.js";
import Projects from "./components/projects/index.js";
import MainWrapper from "./components/styledComponents/MainWrapper.styles";
import Dashboard from "./components/dashboard/index.js";

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
            <Route exact path="/board/:projectId">
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
