import CloseBtn from "./buttons/CloseBtn";
import TaskRemover from "./TaskRemover";
import StartBtn from "./buttons/StartBtn";
import PauseBtn from "./buttons/PauseBtn";
import FirebaseFetch from "../providers/FirebaseFetch";
import { useState } from "react";

export default function Task({ id, title, taskData, tasksList, setTasksList }) {
  const [savedTimes, setSavedTimes] = useState(taskData.time);
  const [isRunning, setIsRunning] = useState(false);
  const [countIntervalID, setCountIntervalId] = useState();
  const [isTaskRemoverOpen, setIsTaskRemoverOpen] = useState(false);
  const [taskHidden, setTaskHidden] = useState(false);

  const firebaseFetch = new FirebaseFetch();

  function showTime(time) {
    const { seconds, minutes, hours } = convertTimeFromSeconds(time.current);

    let timeDisplay;
    hours > 0
      ? (timeDisplay = `${hours}:${minutes}:${seconds}`)
      : (timeDisplay = `${minutes}:${seconds}`);

    return <>{timeDisplay}</>;
  }

  function convertTimeFromSeconds(timeInSeconds) {
    let seconds, minutes, hours;
    seconds = timeInSeconds;
    minutes = 0;
    hours = 0;

    if (seconds >= 60) {
      seconds %= 60;
      minutes = parseInt(timeInSeconds / 60);
    }

    if (minutes >= 60) {
      minutes %= 60;
      hours = parseInt(timeInSeconds / 60 ** 2);
    }

    [seconds, minutes] = [seconds, minutes].map((item) =>
      item.toString().padStart(2, "0")
    );

    return { seconds, minutes, hours };
  }

  function handleTaskStart() {
    const { current } = savedTimes;
    const startTime = Date.now();
    const newIntervalID = setInterval(() => {
      setSavedTimes({
        ...savedTimes,
        current: current + parseInt((Date.now() - startTime) / 1000),
      });
    }, 1000);
    clearInterval(countIntervalID);
    setCountIntervalId(newIntervalID);
    setIsRunning(true);
  }

  function handleTaskPause() {
    clearInterval(countIntervalID);
    setIsRunning(false);
    const newTaskData = {
      ...taskData,
      time: savedTimes,
    };

    firebaseFetch.updateData(id, newTaskData);
  }

  async function handleTaskSave() {
    clearInterval(countIntervalID);
    setIsRunning(false);
    const newTaskData = {
      ...taskData,
      isDone: true,
      time: savedTimes,
    };
    await firebaseFetch.updateData(id, newTaskData);

    const newTaskList = JSON.parse(JSON.stringify([...tasksList]));
    const taskIndex = newTaskList.findIndex((ele) => ele.id === taskData.id);
    newTaskList.splice(taskIndex, 1, newTaskData);
    setTasksList(newTaskList);

    setIsTaskRemoverOpen(false);
  }

  async function handleTaskRemove() {
    clearInterval(countIntervalID);
    try {
      setTaskHidden(true);
      await firebaseFetch.removeData(id);
    } catch {
      setTaskHidden(false);
    }

    setIsTaskRemoverOpen(false);
  }

  if (!taskHidden)
    return (
      <section className="task">
        <CloseBtn
          className="task__btn task__btn--close"
          onClick={() =>
            isTaskRemoverOpen
              ? setIsTaskRemoverOpen(false)
              : setIsTaskRemoverOpen(true)
          }
        />
        <TaskRemover
          isOpen={isTaskRemoverOpen}
          handleTaskSave={handleTaskSave}
          handleTaskRemove={handleTaskRemove}
          type={taskData.isDone ? "remove" : null}
        />
        <header className="task__header">
          <div className="task__title">{title}</div>
          <div className="task__timer">{showTime(savedTimes)}</div>
        </header>
        {taskData.isDone ? null : (
          <footer className="task__footer">
            <PauseBtn
              className={
                isRunning
                  ? "task__btn task__btn--pause"
                  : "task__btn task__btn--pause task__btn--hidden"
              }
              onClick={handleTaskPause}
            />
            <StartBtn
              className={
                isRunning
                  ? "task__btn task__btn--start task__btn--hidden"
                  : "task__btn task__btn--start"
              }
              onClick={handleTaskStart}
            />
          </footer>
        )}
      </section>
    );
}
