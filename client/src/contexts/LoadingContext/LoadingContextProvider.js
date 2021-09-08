import { useState } from "react";
import LoadingContext from "./LoadingContext";

const LoadingContextProvider = (props) => {
  // State to track when timer details
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={[isLoading, setIsLoading]}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
