import RemoveBtn from "./buttons/RemoveBtn";
import SaveBtn from "./buttons/SaveBtn";

export default function TaskRemover({
  isOpen,
  handleTaskSave,
  handleTaskRemove,
}) {
  if (isOpen) {
    return (
      <div className="task__remover">
        <h2 className="remover__title">
          What would you like to do with this task?
        </h2>
        <ul className="remover__container">
          <li className="container__item">
            <SaveBtn
              className="task__btn task__btn--save"
              onClick={handleTaskSave}
            />
          </li>
          <li className="container__item">
            <RemoveBtn
              className="task__btn task__btn--remove"
              onClick={handleTaskRemove}
            />
          </li>
        </ul>
      </div>
    );
  }
}
