import { useState } from "react";
import CloseBtn from "./buttons/CloseBtn";
import FirebaseFetch from "../providers/FirebaseFetch";
import { v4 as uuidv4 } from "uuid";

export default function TaskForm({ tasksList, addTask, isOpen, setIsOpen }) {
  const defaultValue = "New Task";
  const [formValue, setFormValue] = useState(defaultValue);

  async function handleNewTaskSubmit(evt) {
    evt.preventDefault();
    const firebaseFetch = new FirebaseFetch();
    const taskTemplate = {
      isDone: false,
      time: {
        current: 0,
        total: 0,
      },
      id: uuidv4(),
      title: formValue,
    };

    try {
      await firebaseFetch.pushData(taskTemplate);
      addTask([...tasksList, taskTemplate]);
      setIsOpen(false);
      setFormValue(defaultValue);
    } catch (error) {
      console.error("Data push failed!", error);
      throw new Error("Data push failed!");
    }
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
          value={formValue}
          onFocus={() => (formValue === defaultValue ? setFormValue("") : null)}
          onBlur={() =>
            formValue.length === 0 ? setFormValue(defaultValue) : null
          }
          onChange={(evt) => setFormValue(evt.currentTarget.value)}
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
