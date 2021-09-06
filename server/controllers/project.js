import User, { Project } from "../models/index.js";

export const createProject = async (req, res) => {
  const { data, fp } = req.body;

  // Provide error response if request is missing necessary parameters to create the project
  if (!fp || !data) {
    console.log("Error: Insufficient data provided in the request");

    res.statusCode = 400;
    res.statusMessage =
      "Cannot complete request due to insufficient data provided in the request";
    res.end();
  } else {
    User.findOne({ fp: fp }, (error, user) => {
      // Send error if there is an error finding the user
      if (error) {
        console.log("Error: An error occurred while trying to find the user");

        res.statusCode = 500;
        res.statusMessage = "User cannot be found due to database error";
        res.send(error);
      }

      // Save the new project if user can be found
      else if (user) {
        console.log("User found successfully");

        // Create new project document
        const project = new Project({ ...data, fp: fp });
        const projectPromise = project.save();

        // Push the new project into the user object and save it into the database
        user.projects.push(project._id);
        const userPromise = user.save();

        // Provide successful or unsuccessful response to front end
        Promise.all([projectPromise, userPromise])
          .then((response) => {
            console.log("Project saved");

            res.statusCode = 201;
            res.statusMessage = "Project created successfully";
            res.send(response);
          })
          .catch((error) => {
            console.log("Error: Project cannot be created");

            res.statusCode = 500;
            res.statusMessage =
              "Project cannot be create due to database error";
            res.send(error);
          });
      } else {
        console.log("Error: User cannot be found");

        res.statusCode = 500;
        res.statusMessage = "User cannot be found";
        res.end();
      }
    });
  }
};

export const getProjects = async (req, res) => {
  const { fp } = req.query;

  // Provide error response if request is missing necessary parameters to create the project
  if (!fp) {
    console.log("Error: Insufficient data provided in the request");

    res.statusCode = 400;
    res.statusMessage =
      "Cannot complete request due to insufficient data provided in the request";
    res.end();
  } else {
    // Find projects for database
    Project.find({ fp: fp }, (error, projects) => {
      // Send error if there is an error finding the projects
      if (error) {
        console.log("Error: An error occurred while retrieving projects");

        res.statusCode = 500;
        res.statusMessage = "Projects cannot be found due to database error";
        res.send(error);
      }

      // Send success message with the projects found
      else if (projects) {
        console.log("Projects found successfully");

        res.statusCode = 200;
        res.statusMessage = "Projects found successfully";
        res.send(projects);
      }

      // If projects are not found, send success message stating project was not found
      else {
        console.log("Error: Projects not found");

        res.statusCode = 204;
        res.statusMessage = "Projects not found";
        res.send(projects);
      }
    });
  }
};
