import { Task, List } from "../../mongo/models/index.js";

// Get tasks from db
export const getTasks = async (projectId) => {
  try {
    // Find tasks from db
    const tasks = await Task.find({ projectId: projectId });

    // Return task not found message if none are found in db
    if (tasks.length === 0)
      return {
        __typename: "TasksNotFound",
        projectId: projectId,
        message: "Tasks not found",
      };

    // Return formatted tasks
    return {
      __typename: "Tasks",
      tasks: tasks.map((task) => {
        return {
          ...task._doc,
          created: new Date(task._doc.created).toISOString(),
          dueDate: new Date(task._doc.dueDate).toISOString(),
        };
      }),
    };
  } catch (error) {
    throw error;
  }
};

// Get task in db and link to list
export const createTask = async (taskDetails) => {
  const { listId } = taskDetails;

  try {
    // Find list in db
    const list = await List.findById(listId);

    // Return list not found if its not in db
    if (!list)
      return {
        __typename: "ListNotFound",
        listId: listId,
        message: "List not found.",
      };

    // Create task and save it in db
    const task = new Task({ ...taskDetails });
    await task.save();

    list.tasks.push(task);
    await list.save();

    // Return task to client
    return {
      __typename: "Task",
      ...task._doc,
      _id: task.id,
      created: new Date(task._doc.created).toISOString(),
      dueDate: new Date(task._doc.dueDate).toISOString(),
    };
  } catch (error) {
    throw error;
  }
};
