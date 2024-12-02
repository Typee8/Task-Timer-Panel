import TaskRemoverBtn from "./TaskRemoverBtn";
import TaskRemover from "./TaskRemover";
import { useState } from "react";

export default function Task({ id, title, time }) {
  const [isTaskRemoverOpen, setIsTaskRemoverOpen] = useState(false);

  function showTime(time) {
    const { current, total } = time;
    const currentTime = current + total;
    const { seconds, minutes, hours } = convertTimeFromSeconds(currentTime);

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

  return (
    <section id={id} className="task">
      <TaskRemoverBtn
        className="task__btn task__btn--taskRemover"
        onClick={() =>
          isTaskRemoverOpen
            ? setIsTaskRemoverOpen(false)
            : setIsTaskRemoverOpen(true)
        }
        isDisabled={false}
      />
      {/* Tutaj skończyłem! Muszę dodać task__footer */}
      <TaskRemover isOpen={isTaskRemoverOpen} />
      <header className="task__header">
        <div className="task__title">{title}</div>
        <div className="task__timer">{showTime(time)}</div>
      </header>
      <footer className="task__footer">Btn Start/Pause</footer>
    </section>
  );
}
