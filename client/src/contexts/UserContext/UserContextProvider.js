import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { serverUrl } from "../../settings";

const UserContextProvider = (props) => {
  const { setError } = props;

  // Saves user object into a state
  const [user, setUser] = useState({});

  useEffect(() => {
    // Generate the user's fingerprint
    // Library reference: https://github.com/fingerprintjs/fingerprintjs
    const getFingerPrint = async () => {
      const fpPromise = FingerprintJS.load();

      // Get the visitor identifier when you need it.
      const fp = await fpPromise;
      const result = await fp.get();

      // This is the visitor identifier:
      const visitorId = result.visitorId;

      return visitorId;
    };

    // Fetch the user's fingerprint from the back end, if it exists
    const fetchUser = async (fp) => {
      // Tracks if a valid user was found in the database or not
      let userFound = false;

      const url = new URL(`${serverUrl}/user/get-user`);
      const params = { fp: fp };
      url.search = new URLSearchParams(params).toString();

      await fetch(url)
        .then((res) => {
          // Check if response was successful
          if (res.ok) {
            // If user was found, 200 status is returned and user object is saved
            if (res.status === 200) {
              userFound = true;
              return res.json();
            }

            // If request was successful, but user cannot be found, return false to indicate that no user was found
            else {
              userFound = false;
            }
          }

          // Throw error if errors are found
          else {
            userFound = true;
            throw new Error(res.status);
          }
        })
        .then((res) => {
          // Save user found
          setUser(res);
        })
        .catch((error) => {
          // If errors are found, generate an error message and update error state to display error to user
          const status = parseInt(error.message);
          let message = "";

          if (status === 500) {
            message = "User cannot be found. Please try again later.";
          } else if (status === 400) {
            message =
              "User ID was not provided. Please contact the database administrator.";
          }

          setError({ error: true, message: message });
        });

      return userFound;
    };

    // Create the user's fingerprint if it none has been created in the database
    const createUser = async (fp) => {
      // Make fetch request to back end to create user
      const url = `${serverUrl}/user/create-user`;

      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fp: fp }),
      })
        .then((res) => {
          // Check if response was successful
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(res.status);
          }
        })
        .then((res) => {
          setUser(res);
        })
        .catch((error) => {
          // If errors are found, generate an error message and update error state to display error to user
          const status = parseInt(error.message);

          let message = "";

          if (status === 500) {
            message =
              "User cannot be created due to database error. Please try again later.";
          } else if (status === 400) {
            message =
              "User ID was not provided. Please contact the database administrator.";
          } else {
            message = "An error occurred. User cannot be found or created.";
          }

          setError({ error: true, message: message });
        });
    };

    const getOrCreateUser = async () => {
      // Generate the fingerprint
      const fp = await getFingerPrint();

      // Get user
      const userFound = await fetchUser(fp);

      // Only create a user if no user was found
      if (!userFound) {
        createUser(fp);
      }
    };

    // Go to database and try to get or create the user
    getOrCreateUser();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
