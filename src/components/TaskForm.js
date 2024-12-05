import { useState } from "react";
import CloseBtn from "./CloseBtn";
import FirebaseFetch from "../Providers/FirebaseFetch";

export default function TaskForm({ updateTaskPanel, isOpen, setIsOpen }) {
  const defaultValue = "New Task";
  const [state, setState] = useState(defaultValue);

  async function handleNewTaskSubmit() {
    const firebaseFetch = new FirebaseFetch();
    const taskTemplate = {
      isDone: false,
      time: {
        current: 0,
        total: 0,
      },
      title: state,
    };

    await firebaseFetch.pushData(taskTemplate);
    updateTaskPanel();
  }

  if (isOpen) {
    return (
      <form className="taskForm" onSubmit={handleNewTaskSubmit}>
        <CloseBtn
          className="task__btn task__btn--close"
          onClick={() => setIsOpen(false)}
        />
        <textarea
          className="taskForm__input"
          value={state}
          onFocus={() => (state === defaultValue ? setState("") : null)}
          onBlur={() => (state.length === 0 ? setState(defaultValue) : null)}
          onChange={(evt) => setState(evt.currentTarget.value)}
          maxLength="35"
        />
        <input
          className="task__btn task__btn--submit"
          type="submit"
          value="Submit"
        />
      </form>
    );
  }
}
