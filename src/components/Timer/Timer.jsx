import { RxTimer } from "react-icons/rx";
import styles from "./Timer.module.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Timer = ({ countDownTimer }) => {
  const initialTime = Math.floor(countDownTimer / 1000);
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalTime = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalTime);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${secs}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else {
      return `${minutes}m ${secs}s`;
    }
  };

  return (
    <div className={styles["timer-container"]}>
      <RxTimer size={25} fontWeight={"bold"} />
      <div className={styles["timer-items"]}>
        <small style={{ fontSize: "9px" }}>Time Remaining</small>
        <p>{timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}</p>
      </div>
    </div>
  );
};

Timer.propTypes = {
  countDownTimer: PropTypes.number,
};
export default Timer;
