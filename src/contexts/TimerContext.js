import React, { useState } from "react";

const TimerContext = React.createContext();
export default TimerContext;

// const TimerContextProvider = () => {
//   //   // Tracks if timer is turned on or off
//   const timer = useState(false);

//   return <TimerContext.Provider value={timer}></TimerContext.Provider>;
// };

// export default TimerContextProvider;

// export default TimerContextProvider;
// Create a context
// Create a provider for the context with the initial state fed into it
// Create a useContext where we would like to use it
