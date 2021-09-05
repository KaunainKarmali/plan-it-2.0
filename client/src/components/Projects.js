import { useState, useContext } from "react";
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

  // Tracks whether to open or close the modal to allow user to create a new project
  const [openCreateProjectForm, setOpenCreateProjectForm] = useState(false);

  // Function that submits api post request to create a new project in the database
  const createProject = (projectDetails) => {
    const url = `${serverUrl}/${user.fp}/project/create-project`;

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
      .then((res) => setUser(res))
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
          {user &&
            user.projects &&
            user.projects.map((project, index) => (
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
