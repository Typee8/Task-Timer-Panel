import { useEffect, useState } from "react";
import Task from "./Task";
import AddBtn from "./buttons/AddBtn";
import TaskForm from "./TaskForm";
import FirebaseFetch from "../providers/FirebaseFetch";

export default function TaskPanel() {
  const [tasksList, setTasksList] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const firebaseFetch = new FirebaseFetch();
  async function loadData() {
    const data = await firebaseFetch.fetchData();
    setTasksList(data);
  }

  useEffect(() => loadData, []);
  useEffect(() => {
    isTaskFormOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
  }, [isTaskFormOpen]);

  if (tasksList !== false) {
    const activeTasksJSX = [];
    const finishedTasksJSX = [];

    tasksList.forEach((task) => {
      const component = (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          time={task.time}
          taskData={task}
          updateTaskPanel={loadData}
        />
      );

      if (task.isDone === true) finishedTasksJSX.push(component);
      if (task.isDone === false) activeTasksJSX.push(component);
    });

    return (
      <main className="taskPanel">
        <div className="taskPanel__container">
          {activeTasksJSX}
          <div className="newTask">
            <AddBtn
              className="task__btn task__btn--add"
              onClick={() => setIsTaskFormOpen(true)}
            />
          </div>
        </div>
        {finishedTasksJSX.length > 0 ? (
          <div className="taskPanel__container">
            <h2 className="finishedTasks__header">Finished Tasks</h2>
            {finishedTasksJSX}
          </div>
        ) : null}
        <div
          className={
            isTaskFormOpen
              ? "taskPanel__cover"
              : "taskPanel__cover taskPanel__cover--hidden"
          }
        >
          <TaskForm
            updateTaskPanel={loadData}
            isOpen={isTaskFormOpen}
            setIsOpen={setIsTaskFormOpen}
          />
        </div>
      </main>
    );
  }
}
