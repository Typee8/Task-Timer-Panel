import { useEffect, useState } from "react";
import Task from "./Task";
import FirebaseFetch from "../Providers/FirebaseFetch";

export default function TaskPanel() {
  const [tasksList, setTasksList] = useState(false);
  const firebaseFetch = new FirebaseFetch();

  useEffect(() => loadData, []);

  async function loadData() {
    const data = await firebaseFetch.fetchData();
    setTasksList(data);
  }

  function updateTaskPanel(id, obj) {
    const newTasksList = tasksList.map((task) => (id === task.id ? obj : task));
    setTasksList(newTasksList);
  }

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
        <section className="activeTasks">{activeTasksJSX}</section>
        <section className="finishedTasks">
          <h2 className="finishedTasks__header">Finished Tasks</h2>
          {finishedTasksJSX}
        </section>
      </section>
    );
  }
}
