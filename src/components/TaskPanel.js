import { useEffect, useState } from "react";
import Task from "./Task";
import FirebaseFetch from "../Providers/FirebaseFetch";

export default function TaskPanel() {
  const [tasksList, setTasksList] = useState(false);
  const firebaseFetch = new FirebaseFetch();

  useEffect(
    () => async () => {
      const data = await firebaseFetch.fetchData();
      setTasksList(data);
    },
    []
  );

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
    const activeTasks = tasksList.filter((task) => !task.isDone);
    const activeTasksJSX = activeTasks.map((task) => (
      <Task
        id={task.id}
        title={task.title}
        time={task.time}
        taskData={task}
        updateTaskPanel={updateTaskPanel}
      />
    ));

    return (
      <section className="taskPanel">
        <section className="activeTasks">{activeTasksJSX}</section>
      </section>
    );
  }
}
