import { List, Project } from "../../mongo/models/index.js";

// Get lists from db
export const getLists = async (projectId) => {
  try {
    const lists = await List.find({ projectId: projectId });

    // Check if no lists were found
    if (lists.length === 0)
      return {
        __typename: "ListsNotFound",
        projectId: projectId,
        message: "Lists were not found.",
      };

    // Return formatted lists array
    return {
      __typename: "Lists",
      lists: lists.map((list) => {
        return {
          ...list._doc,
          _id: list.id,
          created: new Date(list._doc.created).toISOString(),
          tasks: list._doc.tasks ? list._doc.tasks.map((task) => task.id) : [],
        };
      }),
    };
  } catch (error) {
    throw error;
  }
};

// Create list in db
export const createList = async (listInput) => {
  const { projectId } = listInput;

  try {
    // Find project in db
    const project = await Project.findById(projectId);

    // Return no project found if its not in db
    if (!project)
      return {
        __typename: "ProjectNotFound",
        projectId: projectId,
        message: "Project was not found.",
      };

    // Create and save list
    const list = new List({ ...listInput });
    await list.save();

    project.lists.push(list.id);
    await project.save();

    // Return list to client
    return {
      __typename: "List",
      ...list._doc,
      _id: list.id,
      created: new Date(list._doc.created).toISOString(),
      tasks: list._doc.tasks ? list._doc.tasks.map((task) => task.id) : [],
    };
  } catch (error) {
    throw error;
  }
};
