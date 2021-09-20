import User from "../mongo/models/index.js";

export const getUser = async (req, res) => {
  const { fp } = req.query;

  console.log("Finding user...");

  // Check if fingerprint was provided, otherwise throw error
  if (!fp) {
    console.log("Error: Insufficient data provided in the request");

    res.statusCode = 400;
    res.statusMessage = "Cannot complete request due to missing fingerprint";
    res.end();
  }

  // Check if user can be found or not
  else {
    User.findOne({ fp: fp }, (error, user) => {
      // Send error if there is an error finding the user
      if (error) {
        console.log("Error: An error occurred while trying to find the user");

        res.statusCode = 500;
        res.statusMessage = "User cannot be found due to database error";
        res.send(error);
      }

      // Send success message with the user found
      else if (user) {
        console.log("User found successfully");

        res.statusCode = 200;
        res.statusMessage = "User found successfully";
        res.send(user);
      }

      // If user is not found, send success message stating user was not found
      else {
        console.log("Error: User not found");

        res.statusCode = 204;
        res.statusMessage = "User not found";
        res.send(user);
      }
    });
  }
};

export const createUser = async (req, res) => {
  const { fp } = req.body;
  console.log("Creating user...");

  // Check if fingerprint was provided, otherwise throw error
  if (!fp) {
    console.log("Error: Insufficient data provided in the request");

    res.statusCode = 400;
    res.statusMessage = "Cannot complete request due to missing fingerprint";
    res.end();
  } else {
    // Create new document for the user and save it
    const user = new User();
    user.fp = fp;
    const promise = user.save();

    // Provide successful or unsuccessful response to front end
    promise
      .then((response) => {
        console.log("User created and saved");

        res.statusCode = 201;
        res.statusMessage = "User created successfully";
        res.send(response);
      })
      .catch((error) => {
        console.log("Error: User cannot be created");

        res.statusCode = 500;
        res.statusMessage = "User cannot be create due to database error";
        res.send(error);
      });
  }
};
