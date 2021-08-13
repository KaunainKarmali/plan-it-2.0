import Wrapper from "./components/Wrapper.styles";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div>
      <Wrapper>
        <Header />
        <Nav />
        <Main />
      </Wrapper>
      <Footer />
    </div>
  );
};

export default App;
