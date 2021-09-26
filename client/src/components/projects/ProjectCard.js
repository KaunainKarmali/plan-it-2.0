import moment from "moment";
import {
  ProjectLink,
  ProjectCardWrapper,
  ProjectDueDate,
} from "./ProjectCard.styles";

const ProjectCard = (props) => {
  const { project } = props;

  return (
    <li>
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
    </li>
  );
};

export default ProjectCard;
