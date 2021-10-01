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
    const task = await Task.findById(_id);

    // Return task not found if its not in db
    if (!task)
      return {
        __typename: "TaskNotEditted",
        _id: _id,
        message: "Task not found.",
      };

    // If list changed, update list objects
    if (task.listId !== listId) {
      // Remove task from old list
      const oldList = await List.findById(task.listId);

      // Return list not found if its not in db
      if (!oldList)
        return {
          __typename: "TaskNotEditted",
          _id: _id,
          message: "List not found.",
        };

      oldList.tasks = oldList.tasks.filter(
        (taskId) => taskId.toString() !== _id
      );

      oldList.markModified("tasks");
      await oldList.save();

      // Add task to new list obj
      const newList = await List.findById(listId);

      // Return list not found if its not in db
      if (!newList)
        return {
          __typename: "TaskNotEditted",
          _id: _id,
          message: "List not found.",
        };

      newList.tasks.push(_id);
      newList.markModified("tasks");
      await newList.save();
    }

    // Update and save task
    task.set({
      ...task._doc,
      ...taskDetails,
      dueDate: new Date(taskDetails.dueDate),
    });

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

export const deleteTask = async (_id) => {
  try {
    const task = await Task.findById(_id);

    if (!task) {
      return {
        __typename: "TaskNotDeleted",
        _id: _id,
        message: "Task not found.",
      };
    }

    // Delete task
    await Task.deleteOne({ _id });

    // Remove task from list
    const list = await List.findById(task.listId);

    // Return list not found if its not in db
    if (!list)
      return {
        __typename: "TaskNotDeleted",
        _id: _id,
        message: "List not found.",
      };

    list.tasks = list.tasks.filter((taskId) => taskId.toString() !== _id);
    list.markModified("tasks");
    await list.save();

    return {
      __typename: "TaskDeleted",
      _id: _id,
      message: "Task successfully deleted.",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
