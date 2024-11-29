import RemoveBtn from "./RemoveBtn";
import TaskRemover from "./TaskRemover";

export default function Task({ id, title }) {
  console.log(id);
  return (
    <section id={id} className="task">
      <RemoveBtn
        className="task__btn task__btn--remove"
        onClick={() => console.log("RemoveBtn click")}
        isDisabled={false}
      />
      {/*       <TaskRemover /> */}
      <header className="task__header">
        <div className="task__title">{title}</div>
        <div className="task__timer">ShowTime</div>
      </header>
      <footer className="task__footer">Btn Start/Pause</footer>
    </section>
  );
}
