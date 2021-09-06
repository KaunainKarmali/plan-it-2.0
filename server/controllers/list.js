import { List, Project } from "../models/index.js";

export const createList = async (req, res) => {
  const { data, projectId } = req.body;

  // Check if request provides necessary information to create a document
  if (!data || !projectId) {
    console.log("Error: Insufficient data provided in the request");

    res.statusCode = 400;
    res.statusMessage =
      "Cannot complete request due to insufficient data provided in the request";
    res.end();
  } else {
    // Find project to save foreign key in it
    Project.findOne({ projectId: projectId }, (error, project) => {
      // Send error if there is an error finding the user
      if (error) {
        console.log(
          "Error: An error occurred while trying to find the project"
        );

        res.statusCode = 500;
        res.statusMessage = "Project cannot be found due to database error";
        res.send(error);
      }

      // Create and save list if project can be found
      else if (project) {
        // Create and save list
        const list = new List({ ...data, projectId: projectId });
        const listPromise = list.save();

        // Save foreign key in project document
        project.lists.push(list._id);
        const projectPromise = project.save();

        // Return success or fail response to front end
        Promise.all([listPromise, projectPromise])
          .then((response) => {
            console.log("List saved");

            res.statusCode = 201;
            res.statusMessage = "List created successfully";
            res.send(response);
          })
          .catch((error) => {
            console.log("Error: List cannot be created");

            res.statusCode = 500;
            res.statusMessage = "List cannot be create due to database error";
            res.send(error);
          });
      }
    });
  }
};

export const getLists = (req, res) => {
  const { projectId } = req.query;

  // Provide error response if request is missing necessary parameters to create the project
  if (!projectId) {
    console.log("Error: Insufficient data provided in the request");

    res.statusCode = 400;
    res.statusMessage =
      "Cannot complete request due to insufficient data provided in the request";
    res.end();
  } else {
    // Find lists from the database
    List.find({ projectId: projectId }, (error, lists) => {
      // Send error if there is an error finding the projects
      if (error) {
        console.log("Error: An error occurred while retrieving lists");

        res.statusCode = 500;
        res.statusMessage = "Lists cannot be found due to database error";
        res.send(error);
      }

      // Send success message with the projects found
      else if (lists) {
        console.log("Lists found successfully");

        res.statusCode = 200;
        res.statusMessage = "Lists found successfully";
        res.send(lists);
      }

      // If projects are not found, send success message stating project was not found
      else {
        console.log("Error: Lists not found");

        res.statusCode = 204;
        res.statusMessage = "Lists not found";
        res.send(lists);
      }
    });
  }
};
