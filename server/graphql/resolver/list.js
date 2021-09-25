import { List, Project } from "../../mongo/models/index.js";

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

export const createList = async (listInput) => {
  const { projectId } = listInput;

  try {
    const project = await Project.findById(projectId);

    if (!project)
      return {
        __typename: "ProjectNotFound",
        projectId: projectId,
        message: "Project was not found.",
      };

    const list = new List({ ...listInput });
    await list.save();

    project.lists.push(list.id);
    await project.save();

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
