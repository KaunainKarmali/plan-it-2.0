import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LISTS, GET_TASKS } from "../../graphql/queries";
import { CREATE_TASK, EDIT_TASK } from "../../graphql/mutations";
import { SubmitButton, SecondaryButton } from "../general/Buttons.styles";
import {
  ModalBackground,
  ModalContainer,
  ModalHeader,
  ModalMain,
  ModalFooter,
  Heading,
  ButtonContainer,
} from "../general/Modal.styles";
import CloseButton from "../general/CloseButton";
import { DropdownContainer } from "./TaskForm.styles";
import { formatDate, getTodaysDate } from "../../utils";
import InputField from "../general/InputField";
import TextareaField from "../general/TextareaField";
import Dropdown from "../general/Dropdown";
import priorityOptions from "../../variables/priority";
import ErrorModal from "../general/ErrorModal.js";
import Loading from "../general/Loading";

const TaskForm = (props) => {
  const {
    openCreateTaskForm,
    setOpenCreateTaskForm,
    openEditTaskForm,
    setOpenEditTaskForm,
    taskObj,
  } = props;

  // Extract project id associated with the board
  const { projectId } = useParams();

  // Store today's date
  const today = useRef(getTodaysDate());

  // Tracks the form inputs
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "low",
    listId: "",
    dueDate: today.current,
  });

  // Tracks if the form inputs are valid
  const [isValid, setIsValid] = useState({
    name: true,
    description: true,
    priority: true,
    listId: true,
    dueDate: true,
  });

  // Tracks list names
  const [lists, setLists] = useState([]);

  // Query to pull list data
  const getLists = useQuery(GET_LISTS, {
    variables: { projectId },
  });

  // Create new list in the db
  const [createTaskMutation, createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: { projectId },
      },
    ],
    awaitRefetchQueries: true,
  });

  // Update task in the db
  const [editTaskMutation, editTask] = useMutation(EDIT_TASK);

  // Update task state if user is editing
  useEffect(() => {
    if (openEditTaskForm) {
      setTask({
        name: taskObj.name,
        description: taskObj.description,
        priority: taskObj.priority,
        listId: taskObj.listId,
        dueDate: formatDate(taskObj.dueDate),
      });
    }
  }, [taskObj, openEditTaskForm]);

  // Update lists state once query runs
  useEffect(() => {
    if (getLists.data && lists.length === 0) {
      setLists(extractLists(getLists));
    }
  }, [getLists, getLists.data, lists]);

  // Create an array of list names
  const extractLists = (getLists) => {
    const { __typename, lists } = getLists.data.lists;

    if (__typename === "Lists") {
      return lists.map((list) => {
        return { value: list._id, name: list.name };
      });
    } else {
      return [];
    }
  };

  // Update state on changes to form element
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // Update form input
    setTask({
      ...task,
      [name]: value,
    });

    // Update validation check
    setIsValid({
      ...isValid,
      [name]: value !== "" ? true : false,
    });
  };

  // TODO: Update validation for dates to match project form
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {}; // errors object
    const taskInputs = { ...task }; // copy of task state

    // Loop through all user inputs and update errors object to flag inputs that failed validation
    for (const property in taskInputs) {
      if (taskInputs[property] === "") {
        validationErrors[property] = false;
      }
    }

    // Update validation state if errors are found, otherwise submit form
    if (Object.keys(validationErrors).length !== 0) {
      setIsValid({ ...isValid, ...validationErrors });
    } else {
      // Create a task in db
      if (openCreateTaskForm) {
        createTaskFunction({ ...task, projectId: projectId });
        setOpenCreateTaskForm(false);
      }

      // Update task in db
      if (openEditTaskForm) {
        editTaskFunction({ ...task, _id: taskObj._id });
        setOpenEditTaskForm(false);
      }

      // Reset state
      handleReset();
    }
  };

  const handleReset = () => {
    setTask({
      name: "",
      description: "",
      priority: "low",
      listId: "",
      dueDate: today.current,
    });

    setIsValid({
      name: true,
      description: true,
      priority: true,
      listId: true,
      dueDate: true,
    });
  };

  // Close modal
  const handleClose = () => {
    openCreateTaskForm && setOpenCreateTaskForm(false);
    openEditTaskForm && setOpenEditTaskForm(false);
  };

  // Function to edit task and submit to back end
  const editTaskFunction = (editTaskInput) => {
    const data = { editTaskInput: { ...editTaskInput } };
    editTaskMutation({ variables: data });
  };

  // Function to create task and submit to back end
  const createTaskFunction = (taskInput) => {
    const data = { taskInput: { ...taskInput } };
    createTaskMutation({ variables: data });
  };

  // Loading and error states
  if (getLists.error || editTask.error || createTask.error)
    return <ErrorModal />;
  if (getLists.loading || editTask.loading || createTask.loading)
    return <Loading />;

  return (
    <ModalBackground>
      <ModalContainer>
        <form action="submit">
          {/* Form header */}
          <ModalHeader>
            <Heading>
              {openCreateTaskForm ? "Create task" : "Edit task"}
            </Heading>
            <CloseButton cb={handleClose} />
          </ModalHeader>

          {/* Form main */}
          <ModalMain>
            <InputField
              type="text"
              id="name"
              name="name"
              value={task.name}
              onChange={handleChange}
              isValid={isValid.name}
              inputLength={task.name.length}
              label="Task name"
            />
            <TextareaField
              id="description"
              name="description"
              rows="5"
              value={task.description}
              onChange={handleChange}
              isValid={isValid.description}
              inputLength={task.description.length}
              label="Description"
            />
            <DropdownContainer>
              <Dropdown
                type="text"
                id="priority"
                name="priority"
                onChange={handleChange}
                isValid={isValid.priority}
                value={task.priority}
                options={priorityOptions}
                inputLength={task.priority.length}
                label="Priority"
              />

              <Dropdown
                id="listId"
                name="listId"
                onChange={handleChange}
                isValid={isValid.listId}
                value={task.listId}
                options={lists}
                inputLength={task.listId.length}
                label="List"
              />
            </DropdownContainer>

            <InputField
              type="date"
              id="dueDate"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              isValid={isValid.dueDate}
              inputLength={task.dueDate.length}
              label="Due date"
            />
          </ModalMain>

          {/* Form footer */}
          <ModalFooter>
            <ButtonContainer>
              <SecondaryButton type="reset" onClick={handleReset}>
                Clear
              </SecondaryButton>
              <SubmitButton type="submit" onClick={handleSubmit}>
                {openCreateTaskForm ? "Create" : "Edit"}
              </SubmitButton>
            </ButtonContainer>
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default TaskForm;
