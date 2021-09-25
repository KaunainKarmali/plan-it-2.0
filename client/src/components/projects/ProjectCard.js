import moment from "moment";
import {
  ProjectLink,
  ProjectCardWrapper,
  ProjectDueDate,
} from "./ProjectCard.styles";

const ProjectCard = (props) => {
  const { project } = props;

  return (
    <ProjectLink
      to={`/board/${project._id}`}
      params={{ projectId: project._id }}
    >
      <ProjectCardWrapper>
        <h3>{project.name}</h3>
        <ProjectDueDate>
          Due {moment(new Date(project.dueDate)).fromNow()}
        </ProjectDueDate>
      </ProjectCardWrapper>
    </ProjectLink>
  );
};

export default ProjectCard;
