import { useState, useContext, useEffect } from "react";
import CreateProjectForm from "../CreateProjectForm";
import ProjectCard from "./ProjectCard";
import { serverUrl } from "../../settings";
import UserContext from "../../contexts/UserContext";
import ErrorModal from "../ErrorModal";
import {
  MainHeaderContainer,
  MainHeaderTitle,
} from "../generalStyledComponents/MainHeader.styles";
import { MainContainer } from "../generalStyledComponents/MainContainer.styles";
import { PrimaryButton } from "../generalStyledComponents/Buttons.styles";
import { ProjectsListContainer } from "./Projects.styles";

const Projects = () => {
  // Tracks if an error occurred during the fetch and displays message to the user
  const [error, setError] = useState({ error: false, message: "" });

  const [user] = useContext(UserContext);

  // Store the projects found for the user
  const [projects, setProjects] = useState([]);

  // Tracks when project has been created and triggers useEffect to pull latest lists
  const [toggleProjectCreated, setToggleProjectCreated] = useState(false);

  // Tracks whether to open or close the modal to allow user to create a new project
  const [openCreateProjectForm, setOpenCreateProjectForm] = useState(false);

  useEffect(() => {
    if ("fp" in user && user.fp !== undefined) {
      const url = new URL(`${serverUrl}/project/get-projects`);
      const params = { fp: user.fp };
      url.search = new URLSearchParams(params).toString();

      fetch(url)
        .then((res) => {
          // Check if response was successful
          if (res.ok) {
            // If projects were found, 200 status is returned
            if (res.status === 200) {
              return res.json();
            }

            // If request was successful, but project cannot be found, return false to indicate that no project was found
            else {
              throw new Error(res.status);
            }
          }

          // Throw error if errors are found
          else {
            throw new Error(res.status);
          }
        })
        .then((res) => {
          // Save projects found
          setProjects(res);
        })
        .catch((error) => {
          // If errors are found, generate an error message and update error state to display error to user
          const status = parseInt(error.message);
          let message = "";

          if (status === 500) {
            message = "Projects cannot be found. Please try again later.";
          } else if (status === 400) {
            message =
              "User ID was not provided. Please contact the database administrator.";
          } else {
            message = "An error occurred while retrieving your projects.";
          }

          setError({ error: true, message: message });
        });
    }
  }, [user, setError, toggleProjectCreated]);

  // Function that submits api post request to create a new project in the database
  const createProject = (projectDetails) => {
    const url = `${serverUrl}/project/create-project`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: projectDetails, fp: user.fp }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((res) => setToggleProjectCreated(!toggleProjectCreated))
      .catch((error) => {
        // If errors are found, generate an error message and update error state to display error to user
        const status = parseInt(error.message);
        let message = "";

        if (status === 400) {
          message =
            "Incomplete data provided in the request. Please contact the database administrator.";
        } else if (status === 500) {
          message = "User cannot be found. Please try again later.";
        } else if (status === 400) {
          message =
            "Project cannot be created. Please contact the database administrator.";
        } else {
          message = "An error occurred. Project cannot be created.";
        }

        setToggleProjectCreated(!toggleProjectCreated);
        setError({ error: true, message: message });
      });
  };

  if (openCreateProjectForm) {
    return (
      <CreateProjectForm
        setOpenCreateProjectForm={setOpenCreateProjectForm}
        createProject={createProject}
      />
    );
  }

  if (error.error) return <ErrorModal error={error} setError={setError} />;

  return (
    <div>
      <MainHeaderContainer>
        <MainHeaderTitle>Your projects</MainHeaderTitle>
        <PrimaryButton onClick={() => setOpenCreateProjectForm(true)}>
          New project
        </PrimaryButton>
      </MainHeaderContainer>
      <MainContainer>
        <ProjectsListContainer>
          {projects &&
            projects.map((project, index) => (
              <ProjectCard key={index} project={project}></ProjectCard>
            ))}
        </ProjectsListContainer>
      </MainContainer>
    </div>
  );
};

export default Projects;
