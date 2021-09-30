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

export const editTask = async (taskDetails) => {
  const { listId, _id } = taskDetails;

  try {
    let task = await Task.findById(_id);

    // Return task not found if its not in db
    if (!task)
      return {
        __typename: "TaskNotUpdated",
        taskId: _id,
        message: "Task not found.",
      };

    // If list changed, update list objects
    if (task._doc.listId !== listId) {
      // Remove task from old list
      const oldList = await List.findById(task._doc.listId);

      // Return list not found if its not in db
      if (!oldList)
        return {
          __typename: "ListNotFound",
          listId: task.listId,
          message: "List not found.",
        };

      oldList._doc.tasks = oldList._doc.tasks.filter(
        (taskId) => taskId !== _id
      );
      await oldList.save();

      // Add task to new list obj
      const newList = await List.findById(listId);

      // Return list not found if its not in db
      if (!newList)
        return {
          __typename: "ListNotFound",
          listId: listId,
          message: "List not found.",
        };

      newList._doc.tasks.push(_id);
      await newList.save();
    }

    // Update and save task
    task._doc = {
      ...task._doc,
      ...taskDetails,
      dueDate: new Date(taskDetails.dueDate),
    };

    await task.save();

    return {
      __typename: "Task",
      ...task._doc,
      _id: task.id,
      created: new Date(task._doc.created).toISOString(),
      dueDate: new Date(task._doc.dueDate).toISOString(),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
