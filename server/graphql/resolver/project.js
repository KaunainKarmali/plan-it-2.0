import { Project } from "../../mongo/models/index.js";
import User from "../../mongo/models/index.js";

// Returns an array of projects from db
export const getProjects = async (fp) => {
  try {
    const projects = await Project.find({ fp: fp });

    // Check if no projects are found
    if (projects.length === 0)
      return {
        __typename: "ProjectsNotFound",
        fp: fp,
        message: "No projects found.",
      };

    // Format and return project object
    return {
      __typename: "Projects",
      projects: projects.map((project) => {
        return {
          ...project._doc,
          _id: project.id,
          created: new Date(project._doc.created).toISOString(),
          startDate: new Date(project._doc.startDate).toISOString(),
          dueDate: new Date(project._doc.dueDate).toISOString(),
        };
      }),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Create a project in the db
export const createProject = async (projectInput) => {
  const { fp, startDate, dueDate } = projectInput;

  try {
    // Check if user exists in the db
    const user = await User.findOne({ fp: fp });

    if (!user) {
      return { __typename: "UserNotFound", fp: fp, message: "User not found." };
    }

    // Create and save project and foreign key in the user object
    const project = new Project({
      ...projectInput,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
    });
    await project.save();

    user.projects.push(project.id);
    await user.save();

    // Return project
    return {
      __typename: "Project",
      ...project._doc,
      _id: project.id,
      created: new Date(project._doc.created).toISOString(),
      startDate: new Date(project._doc.startDate).toISOString(),
      dueDate: new Date(project._doc.dueDate).toISOString(),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
