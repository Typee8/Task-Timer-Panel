import { useState } from "react";
import Task from "./Task";

export default function TaskPanel() {
  const tasksObjPH = [
    {
      id: "1",
      isDone: false,
      isRemoved: false,
      isRunning: false,
      title: "Cleaning",
      time: {
        current: 0,
        start: 0,
        total: 0,
      },
    },
    {
      id: "2",
      isDone: false,
      isRemoved: false,
      isRunning: false,
      title: "Cooking",
      time: {
        current: 0,
        start: 0,
        total: 0,
      },
    },
  ];

  const [tasks, setTasks] = useState(tasksObjPH);

  const activeTasks = tasks.filter((task) => !task.isDone && !task.isRemoved);
  const activeTasksJSX = activeTasks.map((task) => (
    <Task id={task.id} title={task.title} />
  ));

  return (
    <section className="taskPanel">
      <section className="activeTasks">{activeTasksJSX}</section>
    </section>
  );
}
