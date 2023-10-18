import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TasksState } from "../context/TaskContext";

const TaskItem = ({ item, active }) => {
  const navigate = useNavigate();
  const taskDueDate = new Date(item?.dueDate);
  const isActive = item?.isActive;
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [isDeleteActive, setIsDeleteActive] = useState(false)
  const [isCompleteActive, setIsCompleteActive] = useState(false)
  const id = item?.key;

  const {myTasks, getAllMyTask} = TasksState()


  const handleTaskDetail = () => {
    navigate(`/task?id=${id}`);
  };

  const handleDelete = () => {
    setIsCompleteActive(false);
    setIsDeleteActive(true);
    onOpen()
  };

  const handleComplete = () => {
    setIsCompleteActive(true);
    setIsDeleteActive(false);
    onOpen()
  };

  const handleDeleteOrCompleteThisTask = () => {
    if (myTasks && isDeleteActive) {
      const myTask = myTasks.filter((item) => item.key !== id);
      localStorage.removeItem("tasks");
      localStorage.setItem('tasks', JSON.stringify(myTask));
    }
    if (myTasks && isCompleteActive) {
      const updatedItems = myTasks.map((item) => {
        if (item.key === id) {
          return {
           task: item.task,
           dueDate: item.dueDate,
           key: item.key,
           title: item.title,
           isActive: false,
          };
        } else {
          return item;
        }
      });
      localStorage.removeItem("tasks");
      localStorage.setItem('tasks', JSON.stringify(updatedItems));
    }
    onClose()
    setIsCompleteActive(false)
    setIsDeleteActive(false)
    toast({
      description: 'Task status updated successfully',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top'
    });
    getAllMyTask();
  };


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isDeleteActive ?  `Delete Task` : `Mark task complete`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> {isDeleteActive ? `Are you sure you want to delete this task` : `Are you sure you want to mark this task complete`} </Text>
          
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={handleDeleteOrCompleteThisTask}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {(taskDueDate > new Date() && isActive) === active && (
        <Box width={"100%"} marginTop={3}>
          <Box display={"flex"} w={"100%"} justifyContent={"space-between"}>
            <Button
              width={active ? "60%" : "100%"}
              paddingLeft={5}
              justifyContent="flex-start"
              display="flex"
              flexDirection="row"
              alignItems="center"
              colorScheme="gray"
              onClick={handleTaskDetail}
              fontWeight={'bold'}
            >
              {item?.title?.substring(0, 10) + "...."}
            </Button>
            {active && (
              <HStack width={"40%"} marginLeft={2}>
                <Button
                  colorScheme="whatsapp"
                  leftIcon={<CheckIcon />}
                  onClick={handleComplete}
                ></Button>
                <Button
                  colorScheme="twitter"
                  leftIcon={<EditIcon />}
                  onClick={handleTaskDetail}
                ></Button>
                <Button
                  colorScheme="red"
                  leftIcon={<DeleteIcon />}
                  disabled={!active ? true : false}
                  onClick={handleDelete}
                ></Button>
              </HStack>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default TaskItem;
