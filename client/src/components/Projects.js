import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import CreateProjectForm from "./CreateProjectForm";
import ProjectCard from "./ProjectCard";
import { serverUrl } from "../settings";
import UserContext from "../contexts/UserContext";
import { black, green1, green3 } from "../variables/colours";
import ErrorModal from "./ErrorModal";
import { blue3 } from "../variables/colours";
import { PrimaryButton } from "./styledComponents/Buttons.styles";
import { tablet, mobile } from "../variables/screen";

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

  return (
    <div>
      <HeaderContainer>
        <Header>Your projects</Header>
        <CreateButton onClick={() => setOpenCreateProjectForm(true)}>
          New project
        </CreateButton>
      </HeaderContainer>
      <Container>
        <Wrapper>
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
      {error.error && <ErrorModal error={error} setError={setError} />}
    </div>
  );
};

export default Projects;

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 10px;
  column-gap: 10px;

  @media (max-width: ${tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${mobile}) {
    grid-template-columns: 1fr;
  } ;
`;

const Container = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 47px - 64px - 35px - 22px);
  border-radius: 5px;
`;

const Header = styled.h2`
  font-size: 2rem;

  @media (max-width: ${mobile}) {
    font-size: 1.5rem;
  }
`;

const HeaderContainer = styled.div`
  padding-bottom: 10px;
  border-bottom: 2px solid ${blue3};
  margin-bottom: 20px;
  color: ${blue3};
  display: flex;
  justify-content: space-between;
`;

const CreateButton = styled(PrimaryButton)`
  background-color: ${green1};
  font-size: 1rem;
  padding: 10px;
  font-weight: 700;

  &:hover,
  &:focus-visible {
    background-color: ${green3};
    color: ${black};
  }

  @media (max-width: ${mobile}) {
    font-size: 0.9rem;
    padding: 8px 10px;
  }
`;
