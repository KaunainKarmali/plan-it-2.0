import { useState, useContext } from "react";
import styled from "styled-components";
import CreateProjectButton from "./CreateProjectButton";
import CreateProjectForm from "./CreateProjectForm";
import MainHeader from "./MainHeader";
import ProjectCard from "./ProjectCard";
import { serverUrl } from "../settings";
import UserContext from "../contexts/UserContext";

const Projects = () => {
  const [user, setUser] = useContext(UserContext);

  const [openCreateProjectForm, setOpenCreateProjectForm] = useState(false);

  const createProject = (projectDetails) => {
    const url = `${serverUrl}/${user.fp}/project`;

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

        // TODO: Complete error handling
        // if (status === 500) {
        //   message = "User cannot be found. Please try again later.";
        // } else if (status === 400) {
        //   message =
        //     "User ID was not provided. Please contact the database administrator.";
        // }

        // setError({ error: true, message: message });
      });
  };

  return (
    <div>
      <MainHeader heading="Your projects" />
      <Container>
        <Wrapper>
          <CreateProjectButton
            createProject={openCreateProjectForm}
            setCreateProject={setOpenCreateProjectForm}
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
