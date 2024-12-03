import { useState } from "react";
import Task from "./Task";

export default function TaskPanel() {
  const tasksObjPH = [
    {
      id: "1",
      isDone: false,
      title: "Cleaning",
      time: {
        current: 0,
        total: 0,
      },
    },
    {
      id: "2",
      isDone: false,
      title: "Cooking",
      time: {
        current: 0,
        total: 0,
      },
    },
  ];

  const [tasks, setTasks] = useState(tasksObjPH);

  const activeTasks = tasks.filter((task) => !task.isDone);
  const activeTasksJSX = activeTasks.map((task) => (
    <Task id={task.id} title={task.title} time={task.time} />
  ));

  return (
    <section className="taskPanel">
      <section className="activeTasks">{activeTasksJSX}</section>
    </section>
  );
}
