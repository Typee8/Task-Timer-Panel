import TaskRemoverBtn from "./TaskRemoverBtn";
import TaskRemover from "./TaskRemover";
import { useState } from "react";

export default function Task({ id, title }) {
  const [isTaskRemoverOpen, setIsTaskRemoverOpen] = useState(false);

  return (
    <section id={id} className="task">
      <TaskRemoverBtn
        className="task__btn task__btn--taskRemover"
        onClick={() => {
          if (isTaskRemoverOpen) {
            setIsTaskRemoverOpen(false);
          } else {
            setIsTaskRemoverOpen(true);
          }
        }}
        isDisabled={false}
      />
      <TaskRemover isOpen={isTaskRemoverOpen} />
      <header className="task__header">
        <div className="task__title">{title}</div>
        <div className="task__timer">ShowTime</div>
      </header>
      <footer className="task__footer">Btn Start/Pause</footer>
    </section>
  );
}
