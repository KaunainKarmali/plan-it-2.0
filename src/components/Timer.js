import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CounterIdContext from "../contexts/CounterIdContext";
import TimerContext from "../contexts/TimerContext";
import firebase from "../firebase";
import { stdBR } from "../variables/borders";
import {
  blue1,
  grey3,
  grey4,
  grey5,
  white1,
  black,
} from "../variables/colours";
import { mobile, tablet } from "../variables/screen";
import { DurationIconBtn } from "./Task.styles";

const Timer = () => {
  // Hold dbref -> useRef is used instead of useState as a re-render is not necessary
  const dbRef = useRef(null);

  // Tracks whether counter is on or off
  const [isCounting, setIsCounting] = useContext(TimerContext);

  // Tracks the newest task Id to track
  const [counterId] = useContext(CounterIdContext);

  // Tracks the task Id that is currently being tracked -> it will be an empty string if nothing is being tracked
  const [taskId, setTaskId] = useState("");

  // Tracks task title to show to the user
  const [taskTitle, setTaskTitle] = useState("");

  // Both tracks the time elapsed
  const [counter, setCounter] = useState(0); // Used to render most recent time to the screen for the user
  // Used to keep track of the most recent time to be accessed and saved when component unmounts. Usestate values are not available when the component unmounts
  const counterRef = useRef(null);

  // Hold setTimeout id to cancel timeouts
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Start tracking if counter is turned on and there is a new task to track
    if (isCounting) {
      console.log(taskId);

      // Scenario 2: counter is on and user is clicking a different button to transfer the counter
      if (taskId !== "" && taskId !== counterId) {
        // Save old counter
        const dbRef = firebase.database().ref("tasks/" + taskId);
        dbRef.once("value", (data) => {
          const taskObj = data.val();
          taskObj.duration = counter;
          dbRef.set(taskObj);
        });

        // Clear old set interval
        clearInterval(timeoutRef.current);
        timeoutRef.current = "";
      }

      // Create reference to firebase db on mount
      dbRef.current = firebase.database().ref("tasks/" + counterId);

      // Initialize starting point for counter
      dbRef.current.once("value", (data) => {
        const taskObj = data.val();
        setTaskTitle(taskObj.title);

        if (taskObj.duration) {
          setCounter(taskObj.duration);
        } else {
          setCounter(0);
        }
      });

      // Update local state to track the task currently tracked
      setTaskId(counterId);

      // Start tracking time
      timeoutRef.current = setInterval(() => {
        setCounter((counter) => {
          // Save it in useRef to be able to save the data when component unmounts
          counterRef.current = counter + 1;
          return counterRef.current;
        });
      }, 1000);
    }

    // Stop tracking if counter is turned off
    return () => {
      // Stop interval from accumulating time
      clearInterval(timeoutRef.current);
      timeoutRef.current = "";

      // Save to firebase
      dbRef.current.once("value", (data) => {
        const taskObj = data.val();
        taskObj.duration = counterRef.current;
        dbRef.current.set(taskObj);
      });
    };

    // Added both dependendencies to ensure when user switches timing between tasks, the progress is saved and new timer begins
  }, [isCounting, counterId]);

  const handleTurnOffTimer = () => {
    setIsCounting(false);
  };

  return (
    <Wrapper>
      <Header>
        <Heading>Timer</Heading>
      </Header>
      <Main>
        <SecondaryText>{taskTitle}</SecondaryText>
        <PrimaryText>{counter}</PrimaryText>
      </Main>
      <Footer>
        <CustomDuractionIconBtn onClick={handleTurnOffTimer}>
          <i className="fas fa-stopwatch" />
        </CustomDuractionIconBtn>
      </Footer>
    </Wrapper>
  );
};

export default Timer;

//TODO: Refactor styles with DeleteConfirmation component
const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 10px;
  margin-left: 10px;
  width: 150px;
`;

const StandardWrapper = styled.div`
  padding: 10px 20px;

  @media (max-width: ${tablet}) {
    padding: 5px 10px;
  }
`;

// Header styles
const Header = styled(StandardWrapper)`
  border-top-left-radius: ${stdBR};
  border-top-right-radius: ${stdBR};
  background-color: ${grey5};
  border-bottom: 1px solid ${grey4};
`;

const Heading = styled.h4`
  color: ${blue1};
  font-size: 1.2rem;
`;

// Main styles
const Main = styled(StandardWrapper)`
  background-color: ${white1};
`;

const SecondaryText = styled.p`
  color: ${grey3};
  font-size: 1rem;
  margin-bottom: 10px;
`;

const PrimaryText = styled(SecondaryText)`
  font-size: 1rem;
  color: ${black};
`;

// Footer styles
const Footer = styled(StandardWrapper)`
  border-bottom-left-radius: ${stdBR};
  border-bottom-right-radius: ${stdBR};
  background-color: ${grey5};
  border-top: 1px solid ${grey4};
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${mobile}) {
    justify-content: center;
  }
`;

const CustomDuractionIconBtn = styled(DurationIconBtn)`
  visibility: visible;
  background-color: ${grey5};
  margin: 0px;
`;
