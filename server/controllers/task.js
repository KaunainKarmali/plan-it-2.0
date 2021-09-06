import { List, Task } from "../models/index.js";

export const createTask = async (req, res) => {
  const { data, listId } = req.body;

  // Provide error response if request is missing necessary parameters to create the project
  if (!data || !listId) {
    console.log("Error: Insufficient data provided in the request");

    res.statusCode = 400;
    res.statusMessage =
      "Cannot complete request due to insufficient data provided in the request";
    res.end();
  } else {
    List.findOne({ id: listId }, (error, list) => {
      // Send error if there is an error finding the user
      if (error) {
        console.log("Error: An error occurred while trying to find the list");

        res.statusCode = 500;
        res.statusMessage = "List cannot be found due to database error";
        res.send(error);
      }

      // Save the new project if user can be found
      else if (list) {
        console.log("List found successfully");

        // Create new project document
        const task = new Task({ ...data, listId: listId });
        const taskPromise = task.save();

        // Push the new project into the user object and save it into the database
        list.tasks.push(task._id);
        const listPromise = list.save();

        // Provide successful or unsuccessful response to front end
        Promise.all([taskPromise, listPromise])
          .then((response) => {
            console.log("Task saved");

            res.statusCode = 201;
            res.statusMessage = "Task created successfully";
            res.send(response);
          })
          .catch((error) => {
            console.log("Error: Task cannot be created");

            res.statusCode = 500;
            res.statusMessage = "Task cannot be create due to database error";
            res.send(error);
          });
      } else {
        console.log("Error: List cannot be found");

        res.statusCode = 500;
        res.statusMessage = "List cannot be found";
        res.end();
      }
    });
  }
};

export const getTasks = async (req, res) => {
  const { listId } = req.query;

  // Provide error response if request is missing necessary parameters to get the tasks
  if (!listId) {
    console.log("Error: Insufficient data provided in the request");

    res.statusCode = 400;
    res.statusMessage =
      "Cannot complete request due to insufficient data provided in the request";
    res.end();
  } else {
    // Find tasks from the database
    Task.find({ listId: listId }, (error, tasks) => {
      // Send error if there is an error finding the tasks
      if (error) {
        console.log("Error: An error occurred while retrieving tasks");

        res.statusCode = 500;
        res.statusMessage = "Tasks cannot be found due to database error";
        res.send(error);
      }

      // Send success message with the tasks are found
      else if (tasks) {
        console.log("Tasks found successfully");

        res.statusCode = 200;
        res.statusMessage = "Tasks found successfully";
        res.send(tasks);
      }

      // If tasks are not found, send success message stating tasks were not found
      else {
        console.log("Error: Tasks not found");

        res.statusCode = 204;
        res.statusMessage = "Tasks not found";
        res.send(tasks);
      }
    });
  }
};
