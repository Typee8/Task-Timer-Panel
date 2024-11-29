import RemoveBtn from "./RemoveBtn";
import SaveBtn from "./SaveBtn";

export default function TaskRemover() {
  return (
    <section className="task__remover">
      <h2 className="remover__title">
        What would you like to do with this task?
      </h2>
      <div className="remover__container">
        <SaveBtn
          className="task__btn task__btn--save"
          onClick={() => console.log("SaveBtn click")}
        />
        <RemoveBtn
          className="task__btn task__btn--remove"
          onClick={() => console.log("RemoveBtn click")}
        />
      </div>
    </section>
  );
}
