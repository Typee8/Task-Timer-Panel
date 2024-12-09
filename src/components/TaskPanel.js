import { useEffect, useState } from "react";
import Task from "./Task";
import AddBtn from "./AddBtn";
import TaskForm from "./TaskForm";
import FirebaseFetch from "../Providers/FirebaseFetch";

export default function TaskPanel() {
  const [tasksList, setTasksList] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const firebaseFetch = new FirebaseFetch();
  async function loadData() {
    const data = await firebaseFetch.fetchData();
    setTasksList(data);
  }

  useEffect(() => loadData, []);

  if (tasksList === false) {
    return (
      <section className="taskPanel">
        <h2>LOADING</h2>
      </section>
    );
  } else {
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
      <section className="taskPanel">
        <section className="taskPanel__container">
          {activeTasksJSX}
          <section className="newTask">
            <AddBtn
              className="task__btn task__btn--add"
              onClick={() => setIsTaskFormOpen(true)}
            />
          </section>
        </section>
        {finishedTasksJSX.length > 0 ? (
          <section className="taskPanel__container">
            <h2 className="finishedTasks__header">Finished Tasks</h2>
            {finishedTasksJSX}
          </section>
        ) : null}
        {isTaskFormOpen ? (
          <div className="taskPanel__cover">
            <TaskForm
              updateTaskPanel={loadData}
              isOpen={isTaskFormOpen}
              setIsOpen={setIsTaskFormOpen}
            />
          </div>
        ) : null}
      </section>
    );
  }
}
