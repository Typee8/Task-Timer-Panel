import TaskRemoverBtn from "./TaskRemoverBtn";
import TaskRemover from "./TaskRemover";
import StartBtn from "./StartBtn";
import PauseBtn from "./PauseBtn";
import FirebaseFetch from "../Providers/FirebaseFetch";
import { useState } from "react";

export default function Task({ id, title, time, taskData, updateTaskPanel }) {
  const [isTaskRemoverOpen, setIsTaskRemoverOpen] = useState(false);
  const [intervalID, setIntervalId] = useState();
  const [savedTimes, setSavedTimes] = useState(time);
  const [isRunning, setIsRunning] = useState(false);

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
    clearInterval(intervalID);
    setIntervalId(newIntervalID);
    setIsRunning(true);
  }

  function handleTaskPause() {
    clearInterval(intervalID);
    setIsRunning(false);
    const newTaskData = {
      ...taskData,
      time: savedTimes,
    };

    firebaseFetch.updateData(id, newTaskData);
  }

  async function handleTaskSave() {
    clearInterval(intervalID);
    setIsRunning(false);
    const newTaskData = {
      ...taskData,
      isDone: true,
      time: savedTimes,
    };
    await firebaseFetch.updateData(id, newTaskData);
    updateTaskPanel();
    setIsTaskRemoverOpen(false);
  }

  async function handleTaskRemove() {
    clearInterval(intervalID);
    await firebaseFetch.removeData(id);
    updateTaskPanel();
    setIsTaskRemoverOpen(false);
  }

  return (
    <section className="task">
      <TaskRemoverBtn
        className="task__btn task__btn--taskRemover"
        onClick={() =>
          isTaskRemoverOpen
            ? setIsTaskRemoverOpen(false)
            : setIsTaskRemoverOpen(true)
        }
        isDisabled={false}
      />
      <TaskRemover
        isOpen={isTaskRemoverOpen}
        handleTaskSave={handleTaskSave}
        handleTaskRemove={handleTaskRemove}
      />
      <header className="task__header">
        <div className="task__title">{title}</div>
        <div className="task__timer">{showTime(savedTimes)}</div>
      </header>
      <footer className="task__footer">
        {isRunning ? (
          <PauseBtn
            className="task__btn task__btn--pause"
            onClick={handleTaskPause}
          />
        ) : (
          <StartBtn
            className="task__btn task__btn--start"
            onClick={handleTaskStart}
          />
        )}
      </footer>
    </section>
  );
}
