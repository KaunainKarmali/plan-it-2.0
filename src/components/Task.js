import Card, {
  Title,
  Description,
  CloseIconBtn,
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
        <CloseIconBtn>
          <i class="fas fa-times"></i>
        </CloseIconBtn>

        {/* Card Footer */}
        <CardFooter>
          <DateContainer>
            <DateIconBtn>
              <i class="fas fa-calendar-alt" />
            </DateIconBtn>
            <DueDate>{due}</DueDate>
          </DateContainer>
          <Options>
            <DurationIconBtn>
              <i class="fas fa-stopwatch" />
            </DurationIconBtn>
            <EditIconBtn>
              <i class="fas fa-edit" />
            </EditIconBtn>
          </Options>
        </CardFooter>
      </Card>
    </li>
  );
};

export default Task;
