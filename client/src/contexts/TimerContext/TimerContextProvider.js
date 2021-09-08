import { useState } from "react";
import TimerContext from "./TimerContext";

const TimerContextProvider = (props) => {
  // State to track when timer details
  const [timer, setTimer] = useState({
    on: false,
    taskId: "",
    scenario: "",
  });

  return (
    <TimerContext.Provider value={[timer, setTimer]}>
      {props.children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider;
