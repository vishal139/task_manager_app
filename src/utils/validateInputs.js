export const validateInputs = ({ taskDesc, taskTitle, dueDate }) => {
  if (taskTitle.trim() === "") {
    return { isValid: false, msgText: "Task Title can not be empty" };
  }

  if(taskDesc.trim() === '')
  {
    return { isValid: false, msgText: "Task Description can not be empty" };
  }

  if (new Date(dueDate) < new Date()) {
    return { isValid: false, msgText: "Due Date shold be greater than current date and time" };
  }

  return {isValid:true , msgText: 'Task added successfully'};
};
