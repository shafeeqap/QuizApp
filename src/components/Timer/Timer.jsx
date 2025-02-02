import { RxTimer } from "react-icons/rx";
import styles from "./Timer.module.css";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import QuizzesContext from "../../context/quizzesContext";

const Timer = () => {
  const { quizEndTime } = useContext(QuizzesContext);

  // Calculate initial time left (in seconds)
  const calculateTimeLeft = () => {
    const diff = Math.floor((quizEndTime - Date.now()) / 1000);
    return diff > 0 ? diff : 0;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Update the time left every second.
    const intervalTime = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();

      if (newTimeLeft <= 0) {
        clearInterval(intervalTime);
        setTimeLeft(0);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(intervalTime);
  }, [quizEndTime]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (days > 0) {
      return (
        <>
          <div className={styles["box-container"]}>
            <div className={styles["digit-box-container"]}>
              <div className={styles["digit-box"]}>
                <span>{days}</span>{" "}
              </div>
              <div className={styles["digit-box"]}>
                <span>{hours}</span>{" "}
              </div>
              <div className={styles["digit-box"]}>
                <span>{minutes}</span>{" "}
              </div>
              <div className={styles["digit-box"]}>
                <span>{secs}</span>{" "}
              </div>
            </div>
            <div className={styles["time-unit-container"]}>
              <small>D</small>
              <small>H</small>
              <small>M</small>
              <small>S</small>
            </div>
          </div>
        </>
      );
    } else if (hours > 0) {
      return (
        <div className={styles["box-container"]}>
          <div className={styles["digit-box-container"]}>
            <div className={styles["digit-box"]}>
              <span>{hours}</span>{" "}
            </div>
            <div className={styles["digit-box"]}>
              <span>{minutes}</span>{" "}
            </div>
            <div className={styles["digit-box"]}>
              <span>{secs}</span>{" "}
            </div>
          </div>
          <div className={styles["time-unit-container"]}>
            <small>H</small>
            <small>M</small>
            <small>S</small>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles["box-container"]}>
          <div className={styles["digit-box-container"]}>
            <div className={styles["digit-box"]}>
              <span>{minutes}</span>
            </div>
            <div className={styles["digit-box"]}>
              <span>{secs}</span>
            </div>
          </div>
          <div className={styles["time-unit-container"]}>
            <small>M</small>
            <small>S</small>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles["timer-container"]}>
      {/* <RxTimer size={25} fontWeight={"bold"} /> */}
      <div className={styles["timer-items"]}>
        {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}
      </div>
    </div>
  );
};

Timer.propTypes = {
  countDownTimer: PropTypes.number,
};

export default Timer;
