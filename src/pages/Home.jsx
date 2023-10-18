import {
    Box,
    Button,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";

  import { AddIcon, EmailIcon } from "@chakra-ui/icons";
  import TaskForm from "../components/TaskForm";
  import { useEffect, useState } from "react";
  import TaskItem from "../components/TaskItem";
import { TasksState } from "../context/TaskContext";
  
  const Home = () => {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [allTasks, setAllTasks] = useState([]);
    const {myTasks} = TasksState()
  
    const handleTaskAddClick = () => {
      setShowTaskForm((prev) => !prev);
    };
  
    useEffect(() => {
      if (myTasks) {
        setAllTasks(myTasks);
      }
    }, [myTasks]);

  
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
              My Task Manager
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
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              variant="solid"
              w={"100%"}
              onClick={handleTaskAddClick}
            >
              Add Task
            </Button>
            {showTaskForm && <TaskForm setShowTaskForm={setShowTaskForm} />}
          </Box>
          <Box
            w={"100%"}
            h={"100%"}
            bg={"white"}
            p={"5px"}
            borderRadius={"lg"}
            borderWidth={"1px"}
            marginTop={2}
          >
            <Tabs variant="soft-rounded" colorScheme="blue" textColor={"black"}>
              <TabList mb={"1rem"}>
                <Tab width={"50%"} fontWeight='bold'>Incomplete</Tab>
                <Tab width={"50%"} fontWeight='bold'>Completed</Tab>
              </TabList>
              <TabPanels>
                <TabPanel h={'75vh'} overflowY={'scroll'}>
                  {allTasks.map((item) => {
                    return <TaskItem item={item} active={true} key={item.key}/>;
                  })}
                </TabPanel>
                <TabPanel h={'75vh'} overflowY={'scroll'}>
                  {allTasks.map((item) => {
                    return <TaskItem item={item} active={false} key={item.key}/>;
                  })}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
    );
  };
  
  export default Home;
  