import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../../graphql/queries";
import { CREATE_PROJECT } from "../../graphql/mutations";
import CreateProjectForm from "../CreateProjectForm";
import ProjectCard from "./ProjectCard";
import UserContext from "../../contexts/UserContext";
import ErrorModal from "../ErrorModal";
import {
  MainHeaderContainer,
  MainHeaderTitle,
} from "../generalStyledComponents/MainHeader.styles";
import { MainContainer } from "../generalStyledComponents/MainContainer.styles";
import { PrimaryButton } from "../generalStyledComponents/Buttons.styles";
import { ProjectsListContainer } from "./Projects.styles";
import Loading from "../Loading";

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
      <CreateProjectForm
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
