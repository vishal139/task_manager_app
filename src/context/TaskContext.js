import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [myTasks, setMyTasks] = useState();

  const getAllMyTask = () => {
    const allTasks = JSON.parse(localStorage.getItem("tasks"));
    setMyTasks(allTasks);
  };

  useEffect(() => {
    getAllMyTask();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "tasks") {
        getAllMyTask();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <TaskContext.Provider
      value={{
        myTasks,
        setMyTasks,
        getAllMyTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const TasksState = () => {
  return useContext(TaskContext);
};

export default TaskProvider;
