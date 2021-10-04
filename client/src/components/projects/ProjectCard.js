import moment from "moment";
import {
  ProjectLink,
  ProjectCardWrapper,
  ProjectDueDate,
  ProjectItem,
  ProjectTitle,
} from "./ProjectCard.styles";

const ProjectCard = (props) => {
  const { project } = props;

  return (
    <ProjectItem>
      <ProjectLink
        to={`/board/${project._id}`}
        params={{ projectId: project._id }}
      >
        <ProjectCardWrapper>
          <ProjectTitle>{project.name}</ProjectTitle>
          <ProjectDueDate>
            Due {moment(new Date(project.dueDate)).fromNow()}
          </ProjectDueDate>
        </ProjectCardWrapper>
      </ProjectLink>
    </ProjectItem>
  );
};

export default ProjectCard;
