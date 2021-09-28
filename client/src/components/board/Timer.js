import { useContext, useEffect, useRef, useState } from "react";
import TimerContext from "../../contexts/TimerContext";
import { serverUrl } from "../../settings";
import ErrorModal from "../ErrorModal";
import LoadingContext from "../../contexts/LoadingContext/index.js";

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
  const [, setIsLoading] = useContext(LoadingContext);

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
        .catch((error) => {
          // If errors are found, generate an error message and update error state to display error to user
          const status = parseInt(error.message);
          let message = "";

          if (status === 500) {
            message = "Task cannot be found. Please try again later.";
          } else if (status === 400) {
            message =
              "Task ID was not provided. Please contact the database administrator.";
          } else {
            message = "An error occurred while retrieving your tasks.";
          }

          setError({ error: true, message: message });
        });
    };

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
        .catch((error) => {
          // If errors are found, generate an error message and update error state to display error to user
          const status = parseInt(error.message);
          let message = "";

          if (status === 400) {
            message =
              "Incomplete data provided in the request. Please contact the database administrator.";
          } else if (status === 500) {
            message = "Task cannot be found. Please try again later.";
          } else if (status === 400) {
            message =
              "Task duration cannot be saved. Please contact the database administrator.";
          } else {
            message = "An error occurred. Task duration cannot be saved.";
          }

          setError({ error: true, message: message });
        });
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
      switch (timer.scenario) {
        // User is turning on the timer
        case "Scenario 1":
          // Load start time
          await loadStartTime(timer.taskId);

          // Start timer
          startTimer();

          // Turn off loading screen
          setTimeout(() => setIsLoading(false), 1000);

          break;

        // User is turning off the timer
        case "Scenario 2":
          // Stop timer
          stopTimer();

          // Save timer
          await saveEndTime();

          // Turn off loading screen
          setTimeout(() => setIsLoading(false), 1000);

          // Unmount component
          setTimer({
            on: false,
            taskId: "",
            scenario: "",
          });
          break;

        // Switch timer from one task to another
        case "Scenario 3":
          // Stop timer
          stopTimer();

          // Save timer
          await saveEndTime();

          // Load start time
          await loadStartTime(timer.taskId);

          // Start timer
          startTimer();

          // Turn off loading screen
          setTimeout(() => setIsLoading(false), 1000);

          break;
        default:
          break;
      }
    };

    executeTimer();
  }, [timer, setTimer, setIsLoading]);

  const handleTurnOffTimer = () => {
    setIsLoading(true);
    setTimer({ ...timer, taskId: "", scenario: "Scenario 2" });
  };

  return (
    <div>
      {/* <Wrapper>
        <Header>
          <Heading>Timer</Heading>
        </Header>
        <Main>
          <SecondaryText>{task.title}</SecondaryText>
          <PrimaryText>{counter}</PrimaryText>
        </Main>
        <Footer>
          <CustomDurationIconBtn onClick={handleTurnOffTimer}>
            <i className="fas fa-stopwatch" />
          </CustomDurationIconBtn>
        </Footer>
      </Wrapper>
      {error.error && <ErrorModal error={error} setError={setError} />} */}
    </div>
  );
};

export default Timer;
