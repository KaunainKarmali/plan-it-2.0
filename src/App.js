import Wrapper from "./components/styledComponents/Wrapper.styles";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import TimerContextProvider from "./contexts/TimerContext/TimerContextProvider";

const App = () => {
  return (
    <div>
      <Wrapper>
        <Header />
        <Nav />
        <TimerContextProvider>
          <Main />
        </TimerContextProvider>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default App;
