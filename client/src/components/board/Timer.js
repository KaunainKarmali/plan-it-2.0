import { useContext, useEffect, useRef, useState } from "react";
import { serverUrl } from "../../settings";
import { formatDuration } from "../../utils";
import TimerContext from "../../contexts/TimerContext/index.js";
import {
  Wrapper,
  Header,
  Heading,
  Main,
  SecondaryText,
  PrimaryText,
  Footer,
  CustomDurationIconBtn,
} from "./Timer.styles";
import ErrorModal from "../general/ErrorModal";
import Loading from "../general/Loading";

const Timer = () => {
  // Tracks timer details
  const [timer, setTimer] = useContext(TimerContext);

  // Store the task object from the back end
  const [task, setTask] = useState({});
  const taskRef = useRef({});

  // Tracks the time elapsed
  const [counter, setCounter] = useState(0); // Used to render most recent time to the screen for the user

  // Used to keep track of the most recent time to be accessed and saved when component unmounts. UseState values are not available when the component unmounts therefore useRef is used
  const counterRef = useRef(null);

  // Hold setTimeout id to cancel timeouts
  const timeoutRef = useRef(null);

  // Tracks if an error occurred or not
  const [error, setError] = useState(false);

  // Tracks if the timer is loading or not
  const [loading, setLoading] = useState(false);
  // const [, setIsLoading] = useContext(LoadingContext);

  useEffect(() => {
    // Goes to the back end to fetch the start time for the task
    const loadStartTime = async (taskId) => {
      const url = new URL(`${serverUrl}/task/get-task-by-id`);
      const params = { taskId: taskId };
      url.search = new URLSearchParams(params).toString();

      await fetch(url)
        .then((res) => {
          // Check if response was successful
          if (res.ok) {
            // If task were found, 200 status is returned
            if (res.status === 200) {
              return res.json();
            }

            // If request was successful, but task cannot be found, return false to indicate that no task was found
            else {
              throw new Error(res.status);
            }
          }

          // Throw error if errors are found
          else {
            throw new Error(res.status);
          }
        })
        .then((res) => {
          // Save start time
          const startTime = res.duration ? res.duration : 0;

          setCounter(startTime);

          // Save task found
          setTask(res);
          taskRef.current = res;
        })
        .catch((error) => setError(true));
    };

    // Goes to save the end timer in the back end
    const saveEndTime = async () => {
      const url = `${serverUrl}/task/update-duration`;

      const taskId = taskRef.current._id;
      const duration = counterRef.current;

      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { duration: duration },
          taskId: taskId,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(res.status);
          }
        })
        .then((res) => {
          taskRef.current = {};
        })
        .catch((error) => setError(true));
    };

    // Start tracking time
    const startTimer = () => {
      timeoutRef.current = setInterval(() => {
        setCounter((counter) => {
          // Save it in useRef to be able to save the data when component unmounts
          counterRef.current = counter + 1;
          return counterRef.current;
        });
      }, 1000);
    };

    // Stop tracking time
    const stopTimer = () => {
      clearInterval(timeoutRef.current);
      timeoutRef.current = "";
    };

    // Async function to manage the start and stop of the timer
    const executeTimer = async () => {
      setLoading(true);

      switch (timer.scenario) {
        // User is turning on the timer
        case "SCENARIO 1":
          // Load start time
          await loadStartTime(timer.taskId);

          // Start timer
          startTimer();

          // Turn off loading screen
          setTimeout(() => setLoading(false), 1000);

          break;

        // User is turning off the timer
        case "SCENARIO 2":
          // Stop timer
          stopTimer();

          // Save timer
          await saveEndTime();

          // Turn off loading screen
          setTimeout(() => setLoading(false), 1000);

          // Unmount component
          setTimer({
            on: false,
            taskId: "",
            scenario: "",
          });
          break;

        // Switch timer from one task to another
        case "SCENARIO 3":
          // Stop timer
          stopTimer();

          // Save timer
          await saveEndTime();

          // Load start time
          await loadStartTime(timer.taskId);

          // Start timer
          startTimer();

          // Turn off loading screen
          setTimeout(() => setLoading(false), 1000);

          break;
        default:
          break;
      }
    };

    executeTimer();
  }, [timer, setTimer, setLoading]);

  const handleTurnOffTimer = () => {
    setLoading(true);
    setTimer({ ...timer, taskId: "", scenario: "SCENARIO 2" });
  };

  if (error) return <ErrorModal />;
  if (loading) return <Loading />;

  return (
    <Wrapper>
      <Header>
        <Heading>Time elapsed</Heading>
      </Header>
      <Main>
        <SecondaryText>{task.name}</SecondaryText>
        <PrimaryText>{formatDuration(counter)}</PrimaryText>
      </Main>
      <Footer>
        <CustomDurationIconBtn onClick={handleTurnOffTimer}>
          <i className="fas fa-stopwatch" />
        </CustomDurationIconBtn>
      </Footer>
    </Wrapper>
  );
};

export default Timer;
