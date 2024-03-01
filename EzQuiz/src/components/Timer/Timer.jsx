import "./Timer.css";
import { useTimer } from "react-timer-hook";
import PropTypes from "prop-types";

export default function Timer({ expiryTimestamp, setFinishQuiz }) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => setFinishQuiz(true),
  });

  return (
    <div className="timer">
      <div className="timer-values">
        <span>{days}</span> :<span>{hours}</span> :<span>{minutes}</span> :
        <span>{seconds}</span>
      </div>
      <div className="timer-str">
        <span>days</span> <span>hours</span> <span>minutes</span>{" "}
        <span>seconds</span>{" "}
      </div>
    </div>
  );
}

Timer.propTypes = {
  expiryTimestamp: PropTypes.objectOf(Date).isRequired,
  setFinishQuiz: PropTypes.func.isRequired,
};
