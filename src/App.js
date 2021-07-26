import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import TaskForm from "./components/TaskForm";

const App = () => {
  return (
    <div>
      <Wrapper>
        <TaskForm />
        <Header />
        <Nav />
        <Main />
      </Wrapper>
      <Footer />
    </div>
  );
};

export default App;
