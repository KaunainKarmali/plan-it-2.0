import { useState } from "react";
import styled from "styled-components";
import CreateProjectButton from "./CreateProjectButton";
import CreateProjectForm from "./CreateProjectForm";
import MainHeader from "./MainHeader";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    { name: "New project", dueDate: "2021-09-02" },
    { name: "Another new project", dueDate: "2021-09-10" },
    { name: "Another new project", dueDate: "2021-09-10" },
    { name: "Another new project", dueDate: "2021-09-10" },
    { name: "Another new project", dueDate: "2021-09-10" },
    { name: "Another new project", dueDate: "2021-09-10" },
    { name: "Another new project", dueDate: "2021-09-10" },
    { name: "Another new project", dueDate: "2021-09-10" },
    { name: "Another new project", dueDate: "2021-09-10" },
    { name: "Another new project", dueDate: "2021-09-10" },
  ];

  const [createProject, setCreateProject] = useState(false);

  return (
    <div>
      <MainHeader heading="Your projects" />
      <Wrapper>
        <CreateProjectButton
          createProject={createProject}
          setCreateProject={setCreateProject}
        />
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project}></ProjectCard>
        ))}
      </Wrapper>
      {createProject && (
        <CreateProjectForm setCreateProject={setCreateProject} />
      )}
    </div>
  );
};

export default Projects;

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
