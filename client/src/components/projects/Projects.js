import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../../graphql/queries";
import { CREATE_PROJECT } from "../../graphql/mutations";
import ProjectForm from "./ProjectForm";
import ProjectCard from "./ProjectCard";
import UserContext from "../../contexts/UserContext";
import ErrorModal from "../general/ErrorModal";
import {
  MainContainer,
  MainHeaderContainer,
  MainHeaderTitle,
} from "../general/Main.styles";
import { PrimaryButton } from "../general/Buttons.styles";
import { ProjectsListContainer } from "./Projects.styles";
import Loading from "../general/Loading";

const Projects = () => {
  const [user] = useContext(UserContext);
  const { fp } = user;

  // Get projects using user's fp
  const getProjects = useQuery(GET_PROJECTS, {
    variables: { fp },
  });

  // Create new project in db
  const [createProjectMutation, createProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
        variables: { fp },
      },
    ],
    awaitRefetchQueries: true,
  });

  // Tracks whether to open or close the modal to allow user to create a new project
  const [openCreateProjectForm, setOpenCreateProjectForm] = useState(false);

  // Return error and loading states
  if (getProjects.error || createProject.error) return <ErrorModal />;
  if (getProjects.loading || createProject.loading) return <Loading />;

  // Render a new project form
  if (openCreateProjectForm) {
    return (
      <ProjectForm
        setOpenCreateProjectForm={setOpenCreateProjectForm}
        createProjectMutation={(projectDetails) => {
          const data = { projectInput: { ...projectDetails, fp: fp } };
          createProjectMutation({ variables: data });
        }}
      />
    );
  }

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
          {getProjects.data.projects.__typename === "Projects" &&
            getProjects.data.projects.projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
        </ProjectsListContainer>
      </MainContainer>
    </div>
  );
};

export default Projects;
