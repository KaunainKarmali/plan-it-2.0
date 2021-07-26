import Card, {
  Title,
  Description,
  TaskCloseIconBtn,
  CardFooter,
  DateContainer,
  DateIconBtn,
  DueDate,
  Options,
  DurationIconBtn,
  EditIconBtn,
} from "./Task.styles";

const Task = (props) => {
  const { title, description, due } = props.task;

  return (
    <li>
      <Card>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <TaskCloseIconBtn>
          <i className="fas fa-times"></i>
        </TaskCloseIconBtn>

        {/* Card Footer */}
        <CardFooter>
          <DateContainer>
            <DateIconBtn>
              <i className="fas fa-calendar-alt" />
            </DateIconBtn>
            <DueDate>{due}</DueDate>
          </DateContainer>
          <Options>
            <DurationIconBtn>
              <i className="fas fa-stopwatch" />
            </DurationIconBtn>
            <EditIconBtn>
              <i className="fas fa-edit" />
            </EditIconBtn>
          </Options>
        </CardFooter>
      </Card>
    </li>
  );
};

export default Task;
