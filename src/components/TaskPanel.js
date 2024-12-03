import { useEffect, useState } from "react";
import Task from "./Task";
import FirebaseFetch from "../Providers/FirebaseFetch";

export default function TaskPanel() {
  const firebaseFetch = new FirebaseFetch();
  const [tasksList, setTasksList] = useState(false);

  useEffect(
    () => async () => {
      const data = await firebaseFetch.fetchData();
      setTasksList(data);
    },
    []
  );

  if (tasksList === false) {
    return (
      <section className="taskPanel">
        <h2>LOADING</h2>
      </section>
    );
  } else {
    const activeTasks = tasksList.filter((task) => !task.isDone);
    const activeTasksJSX = activeTasks.map((task) => (
      <Task id={task.id} title={task.title} time={task.time} />
    ));

    return (
      <section className="taskPanel">
        <section className="activeTasks">{activeTasksJSX}</section>
      </section>
    );
  }
}
