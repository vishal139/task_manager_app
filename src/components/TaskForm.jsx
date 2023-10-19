import { AddIcon, CalendarIcon } from "@chakra-ui/icons";
import { Box, Button, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TasksState } from "../context/TaskContext";
import { validateInputs } from "../utils/validateInputs";

const TaskForm = ({setShowTaskForm}) => {
  const [taskDesc, setTaskDesc] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const {myTasks, getAllMyTask} = TasksState()
  const toast = useToast()

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setTaskDesc(inputValue);
  };
  const handleSubmit = () => {

    const {isValid, msgText} = validateInputs({taskDesc, taskTitle, dueDate});

    if(!isValid)
    {
      toast({
        description: msgText,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    let newData = [];
    const timestamp = new Date().getTime();
    const uniqueId = `${timestamp}_${Math.floor(Math.random() * 1000)}`;

    if(myTasks)
    {
       newData = [...myTasks, {task:taskDesc, dueDate, key: uniqueId, isActive: true, title: taskTitle}];
    }
    else{
      newData = [{task:taskDesc, dueDate, key: uniqueId, isActive: true, title: taskTitle}];
    }

    localStorage.setItem('tasks', JSON.stringify(newData));

    setShowTaskForm((prev)=> !prev);
    toast({
      description: msgText,
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top'
    });
    getAllMyTask();
  };
  return (
    <Box
      w={"100%"}
      // h={'100%'}
      bg={"white"}
      p={"5px"}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Input mb="4px" placeholder="Enter Task Title" value={taskTitle} onChange={(e)=>{
        setTaskTitle(e.target.value);
      }}></Input>
      <Textarea
        value={taskDesc}
        onChange={handleInputChange}
        placeholder="Add task description ..."
        size="sm"
      />
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"space-between"}
        alignContent={"center"}
        marginTop={5}
      >
        <Button
          leftIcon={<CalendarIcon />}
          onClick={() => {
            setShowDatePicker((prev) => !prev);
          }}
        >
          Add a due date
        </Button>

        {showDatePicker && (
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
          </Box>
        )}

        <Button colorScheme="teal" variant="solid" marginTop={1} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
