import TaskRemoverBtn from "./TaskRemoverBtn";
import TaskRemover from "./TaskRemover";

export default function Task({ id, title }) {
  return (
    <section id={id} className="task">
      <TaskRemoverBtn
        className="task__btn task__btn--taskRemover"
        onClick={() => console.log("TaskRemoverBtn click")}
        isDisabled={false}
      />
      <TaskRemover />
      <header className="task__header">
        <div className="task__title">{title}</div>
        <div className="task__timer">ShowTime</div>
      </header>
      <footer className="task__footer">Btn Start/Pause</footer>
    </section>
  );
}
