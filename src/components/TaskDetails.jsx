import { ArrowLeftIcon, CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { TasksState } from "../context/TaskContext";
import { validateInputs } from "../utils/validateInputs";

const TaskDetails = () => {
  const { myTasks, getAllMyTask } = TasksState();
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [task, setTask] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [isTaskActive, setIsTaskActive] = useState(false);
  const toast = useToast();
  const [dueDate, setDueDate] = useState(new Date());
  const [allTasks, setAllTasks] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const id = params.get("id");

  useEffect(() => {
    if (myTasks) {
      setAllTasks(myTasks);
      const myTask = myTasks.filter((item) => item.key === id);
      setTask(myTask);
      setTaskText(myTask[0].task);
      setTaskTitle(myTask[0].title);
      setDueDate(myTask[0].dueDate);
      setIsTaskActive(myTask[0].isActive);
    }
  }, [id, myTasks]);

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    const { isValid, msgText } = validateInputs({
      taskDesc: taskText,
      taskTitle,
      dueDate,
    });

    if (!isValid) {
      toast({
        description: msgText,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    // Define the updated data
    const updatedData = { task: taskText, dueDate, key: id, title: taskTitle, isActive: isTaskActive };

    // Use the map function to create a new array with the updated object
    const updatedItems = myTasks.map((item) => {
      if (item.key === id) {
        return updatedData;
      } else {
        return item;
      }
    });

    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(updatedItems));

    toast({
      description: 'Task updated successfully',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: "top",
    });
    getAllMyTask();
    handleBack();
  };


  return (
    <Container maxW="4xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w={"100%"}
        borderRadius={"lg"}
        borderWidth={"1px"}
        margin={"5px auto"}
        textAlign={"center"}
      >
        <Text fontSize={"2xl"} color={"#474787"} fontWeight='bold'>
          Task Details
        </Text>
      </Box>
      <Box
        w={"100%"}
        // h={'100%'}
        bg={"white"}
        p={"5px"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Input
          size="lg"
          value={taskTitle}
          fontWeight={"bold"}
          onChange={(e) => {
            setTaskTitle(e.target.value);
          }}
        ></Input>
        <Textarea
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add your task here ..."
          size="md"
          marginTop={2}
        />
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"space-between"}
          alignContent={"center"}
          marginTop={5}
        >
          <Button
            leftIcon={
              <CalendarIcon
                onClick={() => {
                  setShowDatePicker((prev) => !prev);
                }}
              />
            }
            onClick={() => {
              setShowDatePicker((prev) => !prev);
            }}
          >
            {`due date : ${new Date(dueDate).toLocaleDateString()} ${new Date(
              dueDate
            ).toLocaleTimeString()}`}
          </Button>
          {showDatePicker && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <DatePicker
                selected={new Date(dueDate)}
                onChange={(date) => setDueDate(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
              />
            </Box>
          )}

          <Box display={"flex"} justifyContent={"space-between"} marginTop={4}>
            <Button
              leftIcon={<ArrowLeftIcon />}
              colorScheme="teal"
              variant="solid"
              marginTop={1}
              onClick={handleBack}
              width={"40%"}
            >
              Back
            </Button>
            {isTaskActive && <Button
              colorScheme="twitter"
              variant="solid"
              marginTop={1}
              onClick={handleSubmit}
              width={"40%"}
            >
              Update
            </Button>}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default TaskDetails;
