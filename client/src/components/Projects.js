import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import CreateProjectForm from "./CreateProjectForm";
import MainHeader from "./MainHeader";
import ProjectCard from "./ProjectCard";
import { serverUrl } from "../settings";
import UserContext from "../contexts/UserContext";
import CreateButton from "./CreateButton";

const Projects = (props) => {
  const { setError } = props;

  const [user, setUser] = useContext(UserContext);

  // Store the projects found for the user
  const [projects, setProjects] = useState([]);

  // Tracks whether to open or close the modal to allow user to create a new project
  const [openCreateProjectForm, setOpenCreateProjectForm] = useState(false);

  useEffect(() => {
    if (user.fp !== undefined) {
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
          console.log(typeof res);

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
  }, [user, setError]);

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
      .then((res) => setUser(res[1]))
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

        setError({ error: true, message: message });
      });
  };

  return (
    <div>
      <MainHeader heading="Your projects" />
      <Container>
        <Wrapper>
          <CreateButton
            text="Create a project"
            handleClick={() => setOpenCreateProjectForm(true)}
          />
          {projects &&
            projects.map((project, index) => (
              <ProjectCard key={index} project={project}></ProjectCard>
            ))}
        </Wrapper>
      </Container>
      {openCreateProjectForm && (
        <CreateProjectForm
          setOpenCreateProjectForm={setOpenCreateProjectForm}
          createProject={createProject}
        />
      )}
    </div>
  );
};

export default Projects;

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 10px;
  column-gap: 10px;
`;

const Container = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 47px - 64px - 35px - 22px);
  border-radius: 5px;
`;
