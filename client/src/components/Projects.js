import { useState } from "react";
import CreateProjectButton from "./CreateProjectButton";
import CreateProjectForm from "./CreateProjectForm";
import MainHeader from "./MainHeader";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    { name: "New project", dueDate: "2021-09-02" },
    { name: "Another new project", dueDate: "2021-09-10" },
  ];

  const [createProject, setCreateProject] = useState(false);

  return (
    <div>
      <MainHeader heading="Your projects" />
      <CreateProjectButton
        createProject={createProject}
        setCreateProject={setCreateProject}
      />
      <ul>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project}></ProjectCard>
        ))}
      </ul>
      {createProject && (
        <CreateProjectForm setCreateProject={setCreateProject} />
      )}
    </div>
  );
};

export default Projects;
