import User from "../../mongo/models/index.js";

// Create a user in db
export const createUser = async (fp) => {
  try {
    // Check if user already exists
    const exists = await User.findOne({ fp: fp });

    if (exists) {
      return {
        __typename: "UserExists",
        fp: fp,
        message: "User exists.",
      };
    }

    // Create and save new user
    const user = new User({ fp: fp });
    const result = await user.save();

    return {
      __typename: "User",
      ...result._doc,
      _id: result.id,
      created: new Date(result._doc.created).toISOString(),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Get a user from db
export const getUser = async (fp) => {
  try {
    const result = await User.findOne({ fp: fp });

    if (!result) {
      return { __typename: "UserNotFound", fp: fp, message: "User not found." };
    }

    return {
      __typename: "User",
      ...result._doc,
      _id: result.id,
      created: new Date(result._doc.created).toISOString(),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
